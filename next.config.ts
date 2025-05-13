import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

import remarkGfm from 'remark-gfm';
const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   typedRoutes: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'www.notion.so', // 도메인 추가(노션 커버이미지 사용 시 에러 방지)
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
};

const withMDX = createMDX({
  // 필요한 마크다운 플러그인을 추가할 수 있다.
  options: {
    // remarkPlugins: [remarkGfm],
    // ts-expect-error remark-gfm 타입이동
    // remarkPlugins: [['remarkGfm']],
  },
});

export default withMDX(nextConfig);
