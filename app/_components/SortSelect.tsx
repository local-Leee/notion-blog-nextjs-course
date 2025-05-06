// 클라이언트 컴포넌트로 선언
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
export const SortSelect = () => {
  console.log('SortSelect');

  // useRouter 정렬 선택 시 url을 업데이트하기 위해 사용
  const router = useRouter();

  //useSearchParams 훅을 이용해서 현재 url의 sort 파라미터를 가져온다.
  const searchParams = useSearchParams();
  // default 설정: sort 파라미터가 없으면 'latest'로 설정
  const sort = searchParams.get('sort') || 'latest';

  // 이벤트 핸들러 함수 정의
  const handleSort = (value: string) => {
    console.log('value: ', value);

    // 현재 모든 파라미터를 가져온다
    // serchParams는 읽기전용이므로 toString()을 사용해 수정할 수 있도록 문자열로 만들고
    // 새로운 URLSearchParams 객체를 생성해서 set 등으로 값을 변경할 수 있게 한다.
    const params = new URLSearchParams(searchParams.toString());
    // sort 파라미터만 업데이트
    params.set('sort', value);

    // router의 push 메서드를 이용해서 정렬 선택 시 url을 업데이트
    // 파라미터를 업데이트한 params를 쿼리 스트링으로 변환해서 추가
    router.push(`?${params.toString()}`);
  };

  return (
    // onValueChange props를 이용해서 이벤트리스너를 작성할 수 있다.
    // 이벤트 핸들러로 handleSort 함수를 전달한다.
    // value 속성에 sort 파라미터를 바인딩한다.
    <Select value={sort} defaultValue="latest" onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="oldest">오래된순</SelectItem>
      </SelectContent>
    </Select>
  );
};
