import { TagSection } from '@/app/_components/TagSection';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getPublishedPosts, getTags } from '@/lib/notion';
import { HeaderSection } from '@/app/_components/HeaderSection';
import { PostList } from '@/components/features/blog/PostList';
import { Suspense } from 'react';
import Loading from './loading';

interface BlogProps {
  // searchParams는 클라이언트에서 전달되는 쿼리 파라미터를 받는다.
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Blog({ searchParams }: BlogProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';
  const [posts, tags] = await Promise.all([
    // 목록을 가져오는 함수에 태그와 정렬 방식을 전달
    getPublishedPosts(selectedTag, selectedSort),
    getTags(),
  ]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<Loading />}>
            <PostList posts={posts} />
          </Suspense>
        </div>
        {/* 우측 사이드바 */}
        <aside className="flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
