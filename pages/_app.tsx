import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import type {AppProps as Props} from "next/app";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

function App({Component, pageProps}: Props) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
