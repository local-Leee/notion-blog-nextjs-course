import { TagSection } from '@/app/_components/TagSection';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getTags } from '@/lib/notion';
import { HeaderSection } from '@/app/_components/HeaderSection';
// import { PostList } from '@/components/features/blog/PostList';
import PostListClient from '@/components/features/blog/PostList.client';

interface HomeProps {
  // searchParams는 클라이언트에서 전달되는 쿼리 파라미터를 받는다.
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // const { tag, sort } = await searchParams;
  const { tag } = await searchParams;
  const selectedTag = tag || '전체';
  // const selectedSort = sort || 'latest';

  // const [posts, tags] = await Promise.all([
  //   // 목록을 가져오는 함수에 태그와 정렬 방식을 전달
  //   getPublishedPosts(selectedTag, selectedSort),
  //   getTags(),
  // ]);

  // const [tags] = await Promise.all([
  //   // 목록을 가져오는 함수에 태그와 정렬 방식을 전달
  //   getPublishedPosts(selectedTag, selectedSort),
  //   getTags(),
  // ]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>{/* <TagSection tags={tags} selectedTag={selectedTag} /> */}</aside>
        <div className="space-y-8">
          {/* 섹션 제목 */}
          <HeaderSection selectedTag={selectedTag} />
          {/* 블로그 카드 그리드 */}
          {/* <PostList posts={posts} /> */}
          <PostListClient />
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
