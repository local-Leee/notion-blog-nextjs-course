import { Client } from '@notionhq/client';
import type { Post, TagFilterItem } from '@/types/blog';
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

export const getTags = async (): Promise<TagFilterItem[]> => {
  const posts = await getPublishedPosts();

  // 모든 태그를 추출하고 각 태그의 출현 횟수를 계산
  const tagCount = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  // TagFilterItem 형식으로 변환
  const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  // "전체" 태그 추가
  tags.unshift({
    id: 'all',
    name: '전체',
    count: posts.length,
  });

  // 태그 이름 기준으로 정렬 ("전체" 태그는 항상 첫 번째에 위치하도록 제외)
  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

  return [allTag, ...sortedTags];
};
