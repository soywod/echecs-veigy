import React from "react";
import {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";

import {Title, Image} from "../components";
import cs from "./index.module.scss";

type Post = {
  slug: string;
  title: string;
  date: Date | string;
  thumbnail: string | null;
};

type SerializedPost = {
  slug: string;
  title: string;
  date: string;
  thumbnail: string | null;
};

function parsePost(slug: string, rawPost: string): Post {
  const thumbnailMatch = /\((\/wordpress-uploads\/.*?.(jpe?g|png|gif))\)/.exec(rawPost);
  const thumbnail = thumbnailMatch && 1 in thumbnailMatch ? thumbnailMatch[1] : null;
  const md = matter(rawPost);
  return {
    slug,
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
    slug: post.slug,
    title: post.title,
    date: post.date instanceof Date ? post.date.toDateString() : post.date,
    thumbnail: post.thumbnail,
  };
}



export const getStaticProps: GetStaticProps<Props> = async () => {
  const readRawPost = require.context("../posts", false, /\.md$/);
  const posts = readRawPost
    .keys()
    .map(path => ({slug: path.slice(2, -3), rawPost: readRawPost(path).default}))
    .map(({slug, rawPost}) => parsePost(slug, rawPost))
    .sort(orderPostsByDate)
    .map(serializePost);

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

      <div className={cs.posts}>
        {props.posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
            <a className={cs.post}>
              {post.thumbnail && <Image objectFit="cover" src={post.thumbnail} alt={post.title} />}
              <div className={cs.title}>{post.title}</div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
