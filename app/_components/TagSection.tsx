import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '@/types/blog';
import { cn } from '@/lib/utils';

// 태그 목록을 받아오는 타입. notion에서 가져온 태그 목록
interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag: string;
}

// {tags} 받아온 props를 렌더링
export function TagSection({ tags, selectedTag }: TagSectionProps) {
  return (
    <div>
      <Card>
        <CardHeader>태그목록</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {/* props로 받아온 태그 목록 */}
            {tags.map((tag) => (
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
