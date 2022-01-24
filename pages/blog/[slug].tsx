import React from "react";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import cn from "classnames";


import {Title, Image} from "../../components";
import cs from "./component.module.scss";

type Post = {
  title: string;
  date: Date | string;
  content: string;
};

type SerializedPost = {
  title: string;
  date: string;
  content: string;
};

function parsePost(module: any): Post {
  const md = matter(module.default);
  return {
    title: md.data.title,
    date: md.data.date,
    content: md.content,
  };
}

function serializePost(post: Post): SerializedPost {
  return {
    title: post.title,
    date: post.date instanceof Date ? post.date.toDateString() : post.date,
    content: post.content,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = require
    .context("../../posts", false, /\.md$/)
    .keys()
    .map(path => ({params: {slug: path.slice(2, -3)}}));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  if (!ctx.params || typeof ctx.params.slug !== "string") {
    throw new Error("Slug not found");
  }

  const rawPost = require(`../../posts/${ctx.params.slug}.md`);
  const post = parsePost(rawPost);
  const serializedPost = serializePost(post);

  return {props: {post: serializedPost}};
};

type Props = {
  post: SerializedPost;
};

const PostPage: NextPage<Props> = ({post}) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>{post.title}</Title>


      <ReactMarkdown
        className={cs.content}
        components={{
          img: props =>
            props.src ? (
              <span className={cs.imgContainer}>
                <span className={cs.img}>
                  <Image objectFit="cover" src={props.src!} alt="" />
                </span>
              </span>
            ) : null,
          ul: ({className, ...props}) => <ul className={cn(className, cs.ul)} {...props} />,
        }}
      >
        {post.content}
      </ReactMarkdown>
    </>
  );
};

export default PostPage;
