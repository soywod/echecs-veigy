import {GetStaticProps, NextPage} from "next";
import matter from "gray-matter";
import Head from "next/head";

type Post = {
  id: string;
  date: Date;
};

type SerializedPost = {
  [K in keyof Post]: string;
};

function parsePost(module: any): Post {
  const md = matter(module.default);
  return {id: md.data.title, date: md.data.date};
}

function orderPostsByDate(a: Post, b: Post): number {
  if (a.date < b.date) return 1;
  else if (a.date > b.date) return -1;
  else return 0;
}

function serializePost(post: Post): SerializedPost {
  return {id: post.id, date: post.date.toDateString()};
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const readRawPost = require.context("../posts", false, /\.md$/);
  const posts = readRawPost.keys().map(readRawPost).map(parsePost).sort(orderPostsByDate).map(serializePost);

  return {
    props: {
      posts,
    },
  };
};

type Props = {
  posts: Array<SerializedPost>;
};

const BlogPage: NextPage<Props> = props => {
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
        <ul>{props.posts.map(post => post && <li key={post.id}>{post.id}</li>)}</ul>
      </main>
    </>
  );
};

export default BlogPage;
