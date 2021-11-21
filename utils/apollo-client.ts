import {ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

const uri = `${process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL}/api/graphql`;
const cache = new InMemoryCache();

let client: ApolloClient<NormalizedCacheObject>;

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!client) {
    const fromServer = typeof window === "undefined";
    if (fromServer) {
      client = new ApolloClient({ssrMode: true, link: createHttpLink({uri}), cache});
    } else {
      cache.restore(window.__NEXT_DATA__.props.apolloState);
      client = new ApolloClient({uri, cache});
    }
  }

  return client;
}
