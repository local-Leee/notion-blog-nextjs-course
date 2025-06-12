import { getPublishedPosts } from '@/lib/notion';
// 요청과 응답을 처리하는 함수
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 파라미터로 받을 수 있도록 searchParams 가져오기
  const searchParams = request.nextUrl.searchParams;
  // searchParams 에서 총 4개의 파라미터 조회
  const tag = searchParams.get('tag') || undefined;
  const sort = searchParams.get('sort') || undefined;
  const startCursor = searchParams.get('startCursor') || undefined;
  const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined;

  // 블로그 목록을 가져와서 posts 상태에 저장
  // 위 searchParams 에서 가져온 파라미터를 getPublishedPosts 함수에 넘겨준다.
  const response = await getPublishedPosts({ tag, sort, startCursor, pageSize });

  return NextResponse.json(response);
}
