import {NextPage} from "next";
import Head from "next/head";

import {usePostPreviewsQuery} from "../sdk";

const BlogPage: NextPage = () => {
  const {data} = usePostPreviewsQuery();

  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>La vie du club</h1>
        <h2>Liste des articles</h2>
        {data && data.getPosts.__typename === "GetPostsSuccessPayload" ? (
          <ul>{data.getPosts.posts.map(post => post && <li key={post.id}>{post.id}</li>)}</ul>
        ) : (
          <div>Chargement des articles…</div>
        )}
      </main>
    </>
  );
};

export default BlogPage;
