import React from "react";
import {GetStaticProps, NextPage} from "next";
import Img from "next/image";
import Head from "next/head";
import matter from "gray-matter";

import {Title} from "../components";
import cs from "./index.module.scss";

type Post = {
  id: number;
  title: string;
  date: Date | string;
  thumbnail: string | null;
};

type SerializedPost = {
  [K in keyof Post]: string | null;
};

function parsePost(module: any, idx: number): Post {
  const thumbnailMatch = /\((\/wordpress-uploads\/.*?.(jpe?g|png|gif))\)/.exec(module.default);
  const thumbnail = thumbnailMatch && 1 in thumbnailMatch ? thumbnailMatch[1] : null;
  const md = matter(module.default);
  return {
    id: idx,
    title: md.data.title,
    date: md.data.date,
    thumbnail: md.data.thumbnail || thumbnail,
  };
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
    thumbnail: post.thumbnail,
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

      <Title>
        Club d'échecs
        <br />
        <strong>Veigy-Foncenex</strong>
      </Title>
      <ul className={cs.posts}>
        {props.posts.map(post => (
          <li key={post.id} className={cs.post}>
            {post.thumbnail && <Img layout="fill" objectFit="cover" src={post.thumbnail} />}
            <div className={cs.title}>{post.title}</div>
            <div className={cs.fade} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;
