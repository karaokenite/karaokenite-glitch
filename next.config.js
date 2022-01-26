const withTM = require("next-transpile-modules")([
  "@animus-ui/core",
  "@animus-ui/theming",
  "@animus-ui/components",
]);

const withPlugins = require("next-compose-plugins");
const withMDX = require("@next/mdx")();

module.exports = withPlugins(
  [
    withMDX({
      pageExtensions: ["js", "md", "mdx"],
    }),
    withTM,
  ],
  {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    modern: true,
    experimental: { esmExternals: true },
  }
);
