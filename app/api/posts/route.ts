import { getPublishedPosts } from '@/lib/notion';
// 요청과 응답을 처리하는 함수
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 블로그 목록을 가져와서 posts 상태에 저장
  const posts = await getPublishedPosts();

  return NextResponse.json({ posts });
}
