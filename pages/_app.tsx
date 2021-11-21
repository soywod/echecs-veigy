import {FC} from "react";
import {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";

import {Nav} from "../components";
import {getApolloClient} from "../utils/apollo-client";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Nav />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
