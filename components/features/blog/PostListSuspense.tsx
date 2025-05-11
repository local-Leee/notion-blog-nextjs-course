import Link from 'next/link';
import { PostCard } from '@/components/features/blog/PostCard';
import { getPublishedPosts } from '@/lib/notion';
interface PostListProps {
  selectedTag: string;
  selectedSort: string;
}
export default async function PostList({ selectedTag, selectedSort }: PostListProps) {

  // 이러한 posts는 구조분해 할당을 이용해서 가져온다.
  const { posts, hasMore, nextCursor } = await getPublishedPosts({ tag: selectedTag, sort: selectedSort });

  return (
    <div className="grid gap-4">
      {posts.map((post, index) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <PostCard post={post} isFirst={index === 0} />
        </Link>
      ))}
    </div>
  );
}
