import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getTags, getPublishedPosts } from '@/lib/notion';
import { HeaderSection } from '@/app/_components/HeaderSection';
import PostListSuspense from '@/components/features/blog/PostListSuspense';
import { Suspense } from 'react';
import { TagSectionClient } from '@/app/_components/TagSection.client';
import TagSectionSkeleton from '@/app/_components/TagSectionSkeleton';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import { PostList } from '@/components/features/blog/PostList';


interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  // 태그 목록을 가져온다.
  // 이것도 블로그 목록을 가져온 후에 태그 정보를 추출하기 때문에 Suspense 처리를 해준다.
  const tags = getTags();

  // 초기 블로그 목록은 서버에서 가져오기 시작할 것이다.
  // promise 객체로 포스트 목록, hasMore, nextCursor 를 가져온다.
  const postsPromise = await getPublishedPosts({ tag: selectedTag, sort: selectedSort });

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */} 
        <aside>
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSectionClient tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          {/* <Suspense fallback={<PostListSkeleton />}>
            <PostListSuspense postsPromise={postsPromise} />
          </Suspense> */}
          <PostList posts={postsPromise.posts} />
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
