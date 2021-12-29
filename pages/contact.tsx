import {NextPage} from "next";
import Head from "next/head";

import {Title} from "../components";

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>
        Nous <strong>contacter</strong>
      </Title>
    </>
  );
};

export default ContactPage;
