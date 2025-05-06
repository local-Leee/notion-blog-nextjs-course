// 클라이언트 컴포넌트로 선언
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
export const SortSelect = () => {
  console.log('SortSelect');

  // useRouter 정렬 선택 시 url을 업데이트하기 위해 사용
  const router = useRouter();

  // 이벤트 핸들러 함수 정의
  const handleSort = (value: string) => {
    console.log('value: ', value);

    // router의 push 메서드를 이용해서 정렬 선택 시 url을 업데이트
    router.push(`?sort=${value}`);
  };

  return (
    // onValueChange props를 이용해서 이벤트리스너를 작성할 수 있다.
    // 이벤트 핸들러로 handleSort 함수를 전달한다.
    <Select defaultValue="latest" onValueChange={handleSort}>
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
