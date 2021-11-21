const withGraphQL = require("next-plugin-graphql");

/** @type {import('next').NextConfig} */
module.exports = withGraphQL({
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
