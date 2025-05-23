// 타입과 관련된 폴더
// notion 타입 정의
export interface TagFilterItem {
  id: string;
  name: string;
  count: number;
}

export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
  date?: string;
  tags?: string[];
  modifiedDate?: string;
  slug: string;
}
