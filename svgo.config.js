module.exports = {
  multipass: true,
  plugins: [
    { name: "inlineStyles", params: { onlyMatchedOnce: false } },
    "removeDimensions",
    "removeViewBox",
    "removeTitle",
    "removeDesc",
  ],
};
