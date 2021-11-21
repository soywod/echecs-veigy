import type {NextPage as Page} from "next";
import Head from "next/head";

import {usePostPreviewsQuery} from "../sdk";

const BlogPage: Page = () => {
  const {data} = usePostPreviewsQuery();

  if (!data) {
    return <>loading...</>;
  }

  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Blog</h1>
        <ul>{data.getPosts.posts.map(post => post && <li key={post.id}>{post.id}</li>)}</ul>
      </main>
    </>
  );
};

export default BlogPage;
