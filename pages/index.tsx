import {GetStaticProps, NextPage} from "next";
import matter from "gray-matter";
import Head from "next/head";

type Post = {
  id: number;
  title: string;
  date: Date | string;
};

type SerializedPost = {
  [K in keyof Post]: string;
};

function parsePost(module: any, idx: number): Post {
  const md = matter(module.default);
  return {id: idx, title: md.data.title, date: md.data.date};
}

function orderPostsByDate(a: Post, b: Post): number {
  const dateA = a.date instanceof Date ? a.date : new Date(a.date);
  const dateB = b.date instanceof Date ? b.date : new Date(b.date);
  if (dateA < dateB) return 1;
  else if (dateA > dateB) return -1;
  else return 0;
}

function serializePost(post: Post): SerializedPost {
  return {
    id: post.id.toString(),
    title: post.title,
    date: post.date instanceof Date ? post.date.toDateString() : post.date,
  };
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
        <ul>{props.posts.map(post => post && <li key={post.id}>{post.title}</li>)}</ul>
      </main>
    </>
  );
};

export default BlogPage;
