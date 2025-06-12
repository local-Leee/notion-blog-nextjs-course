'use client';

import Link from 'next/link';
import { PostCard } from '@/components/features/blog/PostCard';
import { Loader2 } from 'lucide-react';
import { GetPublishedPostsResponse } from '@/lib/notion';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';
// useInView : 요소가 화면에 보이는지 확인하는 훅
import { useInView } from 'react-intersection-observer';

interface PostListProps {
  postsPromise: Promise<GetPublishedPostsResponse>;
}

export default function PostList({ postsPromise }: PostListProps) {
  const initialData = use(postsPromise);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');
  const pageSize = 2;

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
    queryKey: ['posts', tag, sort, pageSize],
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

  // 관찰하고 싶은 돔에 연결하는 객체
  // ㄴ 그리고 해당요소가 뷰포트에 보이면 true 아니면 false 반환
  // ㄴ 감지가 된다면 inView 변수에 true 값이 들어옴
  const { ref, inView } = useInView(
    // 옵션 객체
    {
      // 요소가 뷰포트에 보이는 시점을 지정
      threshold: 0,
    }
  );

  // 더보기 버튼 클릭 시 다음 페이지를 요청하는 함수
  // const handleLoadMore = () => {
  //   // 다음페이지가 있고, 다음 페이지가 로딩 중이 아니라면
  //   if (hasNextPage && !isFetchingNextPage) {
  //     // 다음 페이지를 요청
  //     fetchNextPage();
  //   }
  // };

  // useEffect 훅을 사용하여 inView 변수가 true 값이 들어오면 다음 페이지를 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      // 인뷰가 보일 때 즉, 툴일 때만 fetchNextpage를 조회하면 ㅋ된다.
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      {/* ref 속성은 관찰하고 싶은 요소를 지정하는 속성 */}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-10" />}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
          <span className="text-muted-foreground text-sm">로딩중...</span>
        </div>
      )}
      {/* {hasNextPage && (
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
      )} */}
    </div>
  );
}
