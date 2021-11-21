import {ApolloServer} from "apollo-server-micro";
import {IncomingMessage, ServerResponse} from "http";
import {DateTimeResolver, DateTimeTypeDefinition} from "graphql-scalars";
import {DateTime} from "luxon";
import matter from "gray-matter";

import blogTypeDefs from "../../blog/schema.gql";
import {Post, Resolvers} from "../../sdk";

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    getPosts() {
      const webpackCtx = require.context("../../blog/posts", false, /\.md$/);
      const keys = webpackCtx.keys();
      const posts: Post[] = keys
        .map(webpackCtx)
        .map((module: any) => matter(module.default))
        .map(post => ({
          id: post.data.title,
          date: post.data.date,
        }))
        .sort((a: Post, b: Post) => {
          const dateA = DateTime.fromISO(a.date);
          const dateB = DateTime.fromISO(b.date);

          if (dateA < dateB) return 1;
          else if (dateA > dateB) return -1;
          else return 0;
        });

      return {__typename: "GetPostsSuccessPayload", posts};
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs: [DateTimeTypeDefinition, blogTypeDefs],
  resolvers,
});
const startApolloServer = apolloServer.start();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    return res.end();
  }

  await startApolloServer;
  await apolloServer.createHandler({path: "/api/graphql"})(req, res);
}

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
