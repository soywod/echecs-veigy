import {NextPage} from "next";
import Head from "next/head";

const AuthenticationPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Se connecter</h1>
      </main>
    </>
  );
};

export default AuthenticationPage;
