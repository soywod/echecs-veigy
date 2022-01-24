import {NextPage} from "next";
import Head from "next/head";

import {Title, Image} from "../components";
import cs from "./blog.module.scss";
import chessBoard from "../images/chessBoard.svg";

const SubscriptionPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>
        S'inscrire <strong>au club</strong>
      </Title>

      <div className={cs.introContent}>
          <Image layout="fixed" width={256} height={256} src={chessBoard.src} alt="chess board" />
          <p>
            Lorem Ipsum
          </p>
      </div>
    </>
  );
};

export default SubscriptionPage;
