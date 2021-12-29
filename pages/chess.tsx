import {NextPage} from "next";
import Head from "next/head";

const ChessPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Les échecs</h1>
    </>
  );
};

export default ChessPage;
