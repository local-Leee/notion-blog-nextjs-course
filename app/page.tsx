import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getTags } from '@/lib/notion';
import { HeaderSection } from '@/app/_components/HeaderSection';
import PostListSuspense from '@/components/features/blog/PostListSuspense';
import { Suspense } from 'react';
import { TagSectionClient } from '@/app/_components/TagSection.client';
interface HomeProps {
  // searchParams는 클라이언트에서 전달되는 쿼리 파라미터를 받는다.
  searchParams: Promise<{ tag?: string; sort?: string }>;
}
  
export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  // 태그 목록을 가져온다.
  // 이것도 블로그 목록을 가져온 후에 태그 정보를 추출하기 때문에 Suspense 처리를 해준다.
  const tags = getTags();

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */} 
        <aside>
          <Suspense fallback={<div>Loading...</div>}>
            <TagSectionClient tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<div>Loading...</div>}>
            <PostListSuspense selectedTag={selectedTag} selectedSort={selectedSort} />
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
