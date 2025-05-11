'use client';

import Link from 'next/link';
import { PostCard } from '@/components/features/blog/PostCard';
import { Button } from '@/components/ui/button';
import { GetPublishedPostsResponse } from '@/lib/notion';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

interface PostListProps {
  postsPromise: Promise<GetPublishedPostsResponse>;
}

export default function PostList({ postsPromise }: PostListProps) {
  const initialData = use(postsPromise);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');

  const fetchPosts = async ({ pageParam }: { pageParam: string | undefined }) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sort) params.set('sort', sort);
    if (pageParam) params.set('startCursor', pageParam);

    // Fetch API, API 라우트를 통해서 응답을 받아옴(데이터 파싱)
    const response = await fetch(`/api/posts?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };

  // 무한 스크롤 처리
  // useInfiniteQuery 훅을 사용하여 무한 스크롤 처리
  // fetchNextPage는 다음 페이지를 요청하는 함수
  // hasNextPage는 더 이상 요청할 페이지가 없는지 여부를 나타내는 불리언 값
  // isFetchingNextPage는 다음 페이지를 가져오는 중인지 여부를 나타내는 불리언 값
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    // queryKey는 쿼리의 고유 식별자.
    // ㄴ 태그나 정렬이 변경되면 다시 쿼리키를 수행
    queryKey: ['posts', tag, sort],
    // queryFn은 데이터를 실제로 가져오는 비동기 함수
    queryFn: fetchPosts,
    // initialPageParam은 첫 번째 페이지의 매개변수. 
    // ㄴ 우리가 사용할 startCursor 라고 보면된다. 초기값은 undefined
    initialPageParam: undefined,
    // getNextPageParam은 다음 페이지를 요청할 때 필요한 파라미터를 결정한다.
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // initialData는 초기 데이터
    initialData: {
      pages: [initialData],
      pageParams: [undefined],
    },
  });

  // 더보기 버튼 클릭 시 다음 페이지를 요청하는 함수
  const handleLoadMore = () => {
    // 다음페이지가 있고, 다음 페이지가 로딩 중이 아니라면 
    if (hasNextPage && !isFetchingNextPage) {
      // 다음 페이지를 요청
      fetchNextPage();
    }
  };

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {allPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <PostCard post={post} isFirst={index === 0} />
          </Link>
        ))}
      </div>
      {hasNextPage && (
        <div>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '로딩중...' : '더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}