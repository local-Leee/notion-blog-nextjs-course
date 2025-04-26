// 타입과 관련된 폴더
// notion 타입 정의
import { LucideIcon } from 'lucide-react';

export interface NotionTag {
  id: string;
  name: string;
  count: number;
}

export interface NotionPost {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
  date?: string;
}

export interface SocialLinks {
  icon: LucideIcon;
  href: string;
}

export interface ContactItems {
  icon: LucideIcon;
  title: string;
  description: string;
  mailto: {
    email: string;
    subject: string;
    body: string;
  };
}
