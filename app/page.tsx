import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Youtube, Github, BookOpen, Instagram, Megaphone, Handshake } from 'lucide-react';
import { PostCard } from '@/components/features/blog/PostCard';
import { TagSection } from './_components/TagSection';
import { ProfileSection } from './_components/ProfileSection';
import { ContactSection } from './_components/ContactSection';
const mockPosts = [
  {
    id: '1',
    title: 'Next.js 13으로 블로그 만들기',
    description: 'Next.js 13과 Notion API를 활용하여 개인 블로그를 만드는 방법을 알아봅니다.',
    coverImage: 'https://picsum.photos/800/400',
    tags: [
      // 타입 에러로 count 추가
      { id: '1', name: 'Next.js', count: 1 },
      { id: '2', name: 'React', count: 1 },
    ],
    authors: '짐코딩',
    date: '2024-02-01',
  },
  {
    id: '2',
    title: 'TypeScript 기초 다지기',
    description: 'TypeScript의 기본 문법과 실전에서 자주 사용되는 패턴들을 살펴봅니다.',
    coverImage: 'https://picsum.photos/800/401',
    tags: [
      // 타입 에러로 count 추가
      { id: '3', name: 'TypeScript', count: 1 },
      { id: '4', name: 'JavaScript', count: 1 },
    ],
    authors: '짐코딩',
    date: '2024-01-15',
  },
];

const mockTags = [
  { id: 'all', name: '전체', count: 20 },
  { id: 'html', name: 'html', count: 10 },
  { id: 'css', name: 'css', count: 5 },
  { id: 'javascript', name: 'javascript', count: 3 },
  { id: 'react', name: 'React', count: 3 },
  { id: 'nextjs', name: 'Next.js', count: 2 },
];

const socialLinks = [
  {
    icon: Youtube,
    href: 'https://www.youtube.com/gymcoding',
  },
  {
    icon: Github,
    href: 'https://github.com/gymcoding',
  },
  {
    icon: BookOpen,
    href: 'https://www.inflearn.com/users/432199/@gymcoding',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/gymcoding',
  },
];

const contactItems = [
  {
    icon: Megaphone,
    title: '광고 및 제휴',
    description: '브랜드 홍보, 컨텐츠 제작, 협업 제안',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[광고/제휴] 제안',
      body: '브랜드/제품명:\n제안 내용:\n기간:\n예산:',
    },
  },
  {
    icon: BookOpen,
    title: '강의 문의',
    description: '기술 강의, 워크샵, 세미나 진행',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[강의] 문의',
      body: '강의 주제:\n예상 인원:\n희망 일정:\n문의 내용:',
    },
  },
  {
    icon: Handshake,
    title: '기타 문의',
    description: '채용, 인터뷰, 기타 협업 제안',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[기타] 문의',
      body: '문의 종류:\n문의 내용:',
    },
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 좌측 사이드바 */}
        <aside>
          {/* 태그 목록 컴포넌트 */}
          {/* 아이디가 넘어가지 않아 mockTags에 id 추가 */}
          <TagSection tags={mockTags} />
        </aside>
        <div className="space-y-8">
          {/* 정렬 추가  */}
          <div className="items center flex justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 방식 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {/* 블로그 카드 반복 */}
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        {/* 우측 사이드바 */}
        <aside className="flex flex-col gap-6">
          <ProfileSection socialLinks={socialLinks} />
          <ContactSection contactItems={contactItems} />
        </aside>
      </div>
    </div>
  );
}
