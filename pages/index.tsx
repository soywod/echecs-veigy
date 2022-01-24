import React from "react";
import {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";

import {Title, Image, Subtitle} from "../components";
import cs from "./index.module.scss";
import sponsors from "../images/sponsors.png";
import board from "../images/chessBoard.webp";
import team from "../images/chessTeam.svg";
import cup from "../images/chessCupSmall.svg";
import loc from "../images/chessLocalisation.svg";

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
  const [lastPost, ...lastPosts] = readRawPost
    .keys()
    .map(path => ({slug: path.slice(2, -3), rawPost: readRawPost(path).default}))
    .map(({slug, rawPost}) => parsePost(slug, rawPost))
    .sort(orderPostsByDate)
    .map(serializePost)
    .slice(0, 9);

  return {
    props: {
      lastPost,
      lastPosts,
    },
  };
};

type Props = {
  lastPost: SerializedPost;
  lastPosts: Array<SerializedPost>;
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

    <div className={cs.header}>
      <Image objectFit="cover" src={board.src} alt='chessboard illustration' />
    </div>

    <div className={cs.intro}>
      <p>Le CEVF est une association loi 1901 ayant pour objectif de promouvoir la pratique des échecs en contexte scolaire, récréatif ou compétitif. Nous dispensons un panel de formation sur 4 communes du chablais, pour tous niveaux à partir de 5 ans.</p>
    </div>

      <Subtitle>Vie du club</Subtitle>
      <div className={cs.posts}>
        {props.lastPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
            <a className={cs.post}>
              {post.thumbnail && <Image objectFit="cover" src={post.thumbnail} alt={post.title} />}
              <div className={cs.title}>{post.title}</div>
            </a>
          </Link>
        ))}
      </div>

      <Subtitle>A propos</Subtitle>
      <section className={cs.flexgrid}>
        <div>
          <Image  layout="fixed" width={156} height={156} src={team.src} alt='chessboard illustration' />
          <p>Une équipe dévouée et une formation de qualité pour vous accompagner à tous niveaux de jeu</p>
        </div>
        <div>
          <Image layout="fixed" width={156} height={156} src={cup.src} alt='chessboard illustration' />
          <p>Le club participe et encadre les jeunes aux principales compétitions scolaires, départementales, régionales, nationales</p>
        </div>
        <div>
          <Image  layout="fixed" width={156} height={156} src={loc.src} alt='chessboard illustration' />
          <p>Des formations données sur 4 communes du Bas-Chablais : Veigy, Douvaine, Bons en Chablais et Ballaison</p>
        </div>
        <h2> Vous souhaitez vous inscrire au club ? </h2><br/>
        <span>Les inscriptions pour la saison 2021-2022 sont ouvertes ! Inscrivez-vous dès maintenant <a href="/registration">en ligne</a></span>

      </section>

      <Subtitle>Nos soutiens</Subtitle>
     <section className={cs.flexgrid}>
        <span> Le club est financé par les cotisations, la commune de Veigy, le département etc. Afin de développer l'activité dans le chablais nous ....</span>
        <h2> Vous souhaitez vous inscrire au club ? </h2><br/>
        <span> Les inscriptions pour la saison 2021-2022 sont ouvertes ! Inscrivez-vous dès maintenant <a href="/registration">en ligne</a></span>
      <div className={cs.sponsors}>
        <Image layout="fixed" width={735} height={91} src={sponsors.src} alt="King chess piece" />
      </div>

      </section>
      

    </>
  );
};

export default BlogPage;