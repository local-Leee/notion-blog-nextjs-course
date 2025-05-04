import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Youtube, Github, BookOpen, Instagram, Megaphone, Handshake } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/features/blog/PostCard';

const mockPosts = [
  {
    id: '1',
    title: 'Next.js 13으로 블로그 만들기',
    description: 'Next.js 13과 Notion API를 활용하여 개인 블로그를 만드는 방법을 알아봅니다.',
    coverImage: 'https://picsum.photos/800/400',
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'React' },
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
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'JavaScript' },
    ],
    authors: '짐코딩',
    date: '2024-01-15',
  },
];

const mockTags = [
  { name: '전체', count: 20 },
  { name: 'html', count: 10 },
  { name: 'css', count: 5 },
  { name: 'javascript', count: 3 },
  { name: 'React', count: 3 },
  { name: 'Next.js', count: 2 },
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
          <Card>
            <CardHeader>태그목록</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {mockTags.map((tag) => (
                  <Link href={`?tag=${tag.name}`} key={tag.name}>
                    <div className="hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors">
                      <span>{tag.name}</span>
                      <span>{tag.count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
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
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-muted rounded-full p-2">
                    <div className="h-36 w-36 overflow-hidden rounded-full">
                      <Image
                        src="/images/profile-light.png"
                        alt="짐코딩"
                        width={144}
                        height={144}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold">현지인</h3>
                  <p className="text-primary text-sm">Full Stack Developer</p>
                </div>

                <div className="flex justify-center gap-2">
                  {socialLinks.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="bg-primary/10"
                      size="icon"
                      asChild
                    >
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <item.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>

                <p className="bg-primary/10 rounded p-2 text-center text-sm">
                  코딩 교육 크리에이터 ✨
                </p>
              </div>
            </CardContent>
          </Card>
          {/* 문의하기 */}
          <Card>
            <CardHeader>
              <CardTitle>문의하기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contactItems.map((item, index) => (
                  <a
                    key={index}
                    href={`mailto:${item.mailto.email}?subject=${encodeURIComponent(
                      item.mailto.subject
                    )}&body=${encodeURIComponent(item.mailto.body)}`}
                    className="group bg-primary/5 hover:bg-muted flex items-start gap-4 rounded-lg p-3 transition-colors"
                  >
                    <div className="bg-primary/20 text-primary flex shrink-0 items-center justify-center rounded-md p-1.5">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground text-xs">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
