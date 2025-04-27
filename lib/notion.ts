import { Client } from '@notionhq/client';
import type { Post } from '@/types/blog';
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPublishedPosts = async (): Promise<Post[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // Notion 응답 객체를 Post 타입 배열로 변환
  const posts: Post[] = response.results.map((page: any) => {
    const properties = page.properties;
    // title 추출
    const title = properties?.Name?.title?.[0]?.plain_text || '';
    // description 추출
    const description = properties?.Description?.rich_text?.[0]?.plain_text || undefined;
    // coverImage 추출 (cover가 있을 경우)
    let coverImage: string | undefined = undefined;
    if (page.cover) {
      if (page.cover.type === 'external') coverImage = page.cover.external.url;
      else if (page.cover.type === 'file') coverImage = page.cover.file.url;
    }
    // author 추출 (people 타입)
    const author = properties?.Author?.people?.[0]?.name || undefined;
    // date 추출 (date 타입)
    const date = properties?.Date?.date?.start || undefined;
    // tags 추출 (multi_select)
    const tags = properties?.Tags?.multi_select?.map((tag: any) => tag.name) || undefined;
    // modifiedDate 추출
    const modifiedDate =
      properties?.ModifierDate?.last_edited_time || page.last_edited_time || undefined;
    // slug 생성 (title을 kebab-case로 변환)
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    return {
      id: page.id,
      title,
      description,
      coverImage,
      author,
      date,
      tags,
      modifiedDate,
      slug,
    };
  });

  return posts;
};
