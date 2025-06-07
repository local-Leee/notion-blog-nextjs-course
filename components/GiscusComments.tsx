'use client'; // 클라이언트 컴포넌트로 선언. 안해주면 내부에서 리액트 관련 훅 사용으로 에러 발생.

// Giscus를 사용하기 위해 설치한 패키지를 import 해준다.
import Giscus from '@giscus/react';

{/* <script src="https://giscus.app/client.js"
        data-repo="local-Leee/notion-blog-nextjs-giscus"
        data-repo-id="R_kgDOO3h9lw"
        data-category="Announcements"
        data-category-id="DIC_kwDOO3h9l84CrJfn"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="ko"
        crossorigin="anonymous"
        async>
</script> */}

export default function GiscusComments() {
  return (
    // Giscus에 가져온 <script> 태그를 넣어준다.    
    <Giscus
        repo="local-Leee/notion-blog-nextjs-giscus"
        repoId="R_kgDOO3h9lw"
        category="Announcements"
        categoryId="DIC_kwDOO3h9l84CrJfn"
        mapping="pathname"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
    />
  );
}