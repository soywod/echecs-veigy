import {NextPage} from "next";
import Head from "next/head";

import {Title, Image} from "../components";
import cs from "./blog.module.scss";
import chessCup from "../images/chessCup.svg";


const CompetitionPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>
        Compétitions / <strong>Résultats</strong>
      </Title>

      <div className={cs.introContent}>
          <Image layout="fixed" width={240} height={256} src={chessCup.src} alt="chess cup" />
          <p>
            Retrouvez les articles concernant les rencontres sportives,évenements, photo et bien plus encore. Dèjà 10 ans d'activité autour du jeu des rois !
          </p>
      </div>
    </>
  );
};

export default CompetitionPage;
