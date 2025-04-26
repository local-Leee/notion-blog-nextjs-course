// 타입과 관련된 폴더
// notion 타입 정의

export interface NotionTag {
  id: string;
  name: string;
}

export interface NotionPost {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
  date?: string;
}
