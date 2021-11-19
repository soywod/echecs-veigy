import type {NextPage as Page, GetStaticProps} from "next";
import Head from "next/head";
import {gql} from "@apollo/client";

import client from "./client";

type User = {
  name: string;
};

const USERS = gql`
  query users {
    users {
      name
    }
  }
`;

type Props = {
  users: User[];
};

const Home: Page<Props> = props => {
  return (
    <>
      <Head>
        <title>{"Club d'échecs de Veigy-Foncenex"}</title>
        <meta name="description" content="Site web officiel du club d'échecs de Veigy-Foncenex." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {props.users.map((user, i) => (
          <div key={i}>{user.name}</div>
        ))}
      </main>
    </>
  );
};

type UsersQuery = {
  users: User[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await client.query<UsersQuery>({query: USERS});
  const props: Props = {users: res.data.users};
  return {props};
};

export default Home;
