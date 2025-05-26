//서버 액션이기 때문에 지시어 추가
'use server';

import { createPost } from '@/lib/notion';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
// zod 사용하기 위해 스키마 정의한다.
// FormData라는 객체를 받았기 때문에 PostData의 스키마 검사를 위해서 post 스키마를 적용하고 Post 안에는 Title, tag, content 적용
// 각 필드마다 예상되는 타입과 제약 조건을 설정할 수 있다.
const postSchema = z.object({
  title: z.string().min(1, {message: '제목을 입력해주세요.'}),
  tag: z.string().min(1, {message: '태그를 입력해주세요.'}),
  content: z.string().min(1, {message: '내용을 입력해주세요.'}),
});

// 타이틀과 태그, 컨텐츠 데이터 타입 정의
export interface PostFormData {
  title: string;
  tag: string;
  content: string;
}

export interface PostFormState {
  message: string;
  errors: {
    title?: string[];
    tag?: string[];
    content?: string[];
  }
  formData?: PostFormData; // 옵셔널 타입으로 설정
  success?: boolean;
}

// 서버 액션
export async function createPostAction(prevState: PostFormState, formData: FormData){
  
  //폼 데이터 추출
  // const title = formData.get('title') as string;
  // const tag = formData.get('tag') as string;
  // const content = formData.get('content') as string;

  // const {title, tag, content} = Object.fromEntries(formData);

  // 폼 데이터 추출
  const rawFormData = {
    title: formData.get('title') as string,
    tag: formData.get('tag') as string,
    content: formData.get('content') as string,
  }

  // 유효성 검사 실행 : formData에 있는 데이터를 검사하고 검사 결과를 반환
  // rawFormData 객체 형태로 데이터를 받아서 유효성 검사를 실행
  const validatedFields = postSchema.safeParse(rawFormData);

  // 유효성 검사 실패 시 오류 메시지 반환
  if (!validatedFields.success) {
    return {
       // flatten(): 중첩된 오류 구조를 평탄화하여 필드별로 오류 메시지 배열을 제공하는 메서드
      // errors 이러한 메시지를 클라이언트 컴포넌트에서 사용해서 어떠한 오류(데이터)가 있는지 명확히 확인할 수 있다.
      errors: validatedFields.error.flatten().fieldErrors,
      message: '유효성 검사에 실패했습니다.',
      formData: rawFormData, // 유효성 검사 실패 시 우리가 설정한 FormData 타입의 데이터를 반환
    };
  }

  // 에러가 발생할 수 있기에 try catch 사용
  try {
    // 유효성 검사 성공 시 반환된 데이터 추출
    const {title, tag, content} = validatedFields.data;

    //데이터 등록
    // 타입이 보장된 데이터를 받았기 때문에 형변환이 필요없다.
    await createPost({
      title: title,
      tag: tag,
      content: content,
    });

    revalidateTag('posts');
    return {
      success: true,
      message: '블로그 포스트가 성공적으로 등록되었습니다.',
    }
  } catch (err) {
    return {
      message: '블로그 포스트 등록에 실패했습니다.',
      formData: rawFormData,
    };
  }
}