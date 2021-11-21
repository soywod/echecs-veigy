import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject>;

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  const fromServer = typeof window === "undefined";
  const apolloState: NormalizedCacheObject = fromServer ? {} : window.__NEXT_DATA__.props.apolloState;

  if (!client) {
    client = new ApolloClient({
      ssrMode: fromServer,
      uri: "http://localhost:3000/api/graphql",
      cache: new InMemoryCache().restore(apolloState),
    });
  }

  return client;
}
