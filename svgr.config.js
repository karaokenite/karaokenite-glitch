const indexTemplate = require("./index-template");
const template = require("./icon-template");
const plugin = require("./icon-babel-plugin");

module.exports = {
  dimensions: false,
  titleProp: true,
  ref: true,
  svgProps: {
    fill: "currentColor",
    role: "img",
    "aria-hidden": "true",
    width: "{width}",
    height: "{height}",
    color: "text",
  },
  replaceAttrValues: { "#000": "currentColor", black: "currentColor" },
  jsx: {
    babelConfig: {
      plugins: [plugin],
    },
  },
  indexTemplate,
  template,
};
