'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '@/types/blog';
import { cn } from '@/lib/utils';
import { use } from 'react';
// 외부에서 태그목록 props를 프로미스로 받아오는 타입
interface TagSectionProps {
  tags: Promise<TagFilterItem[]>;
  selectedTag: string;
}

// {tags} 받아온 props를 렌더링
export function TagSectionClient({ tags, selectedTag }: TagSectionProps) {

  // 프로미스 데이터인 태그목록을 use hook을 이용해서 조회한다.
  const allTags = use(tags);

  // 비동기 처리는 useEffect 훅을 이용해서 처리한다.

  return (
    <div>
      <Card>
        <CardHeader>태그목록</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {/* props로 받아온 태그 목록 */}
            {allTags.map((tag) => (
              <Link href={`?tag=${tag.name}`} key={tag.name}>
                <div
                  className={cn(
                    'hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                    selectedTag === tag.name && 'bg-muted-foreground/10 text-foreground font-medium'
                  )}
                >
                  <span>{tag.name}</span>
                  <span>{tag.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
