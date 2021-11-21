import {FC} from "react";
import {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import Script from "next/script";

import {Nav} from "../components";
import {getApolloClient} from "../utils/apollo-client";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Nav />
      <Component {...pageProps} />
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </ApolloProvider>
  );
};

export default App;
