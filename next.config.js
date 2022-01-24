const withTM = require("next-transpile-modules")([
  "@animus-ui/core",
  "@animus-ui/theming",
  "@animus-ui/components",
]);

const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withTM], {
  modern: true,
  experimental: { esmExternals: true },
});
