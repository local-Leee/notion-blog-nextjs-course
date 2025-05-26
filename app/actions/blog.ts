//서버 액션이기 때문에 지시어 추가
'use server';

import { createPost } from '@/lib/notion';
// 서버 액션
export async function createPostAction(formData: FormData){
  
  //폼 데이터 추출
  const title = formData.get('title') as string;
  const tag = formData.get('tag') as string;
  const content = formData.get('content') as string;

  //데이터 등록
  await createPost({title, tag, content});
  console.log('포스트 등록 완료');


}