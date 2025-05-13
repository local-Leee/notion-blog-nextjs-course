'use client';

import Link from 'next/link';
import { Post } from '@/types/blog';
import { PostCard } from '@/components/features/blog/PostCard';
import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 블로그 목록을 클라이언트에서 조회할 수 있도록 hook에서 가져온다.
  // useEffect는 컴포넌트가 마운트될 때 실행된다. (마운트:컴포넌트가 생성되어(메모리에 올라가서) 화면DOM에 처음 렌더링되는 것)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid gap-4">
      {posts.map((post: Post, index: number) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <PostCard post={post} isFirst={index === 0} />
        </Link>
      ))}
    </div>
  );
}
