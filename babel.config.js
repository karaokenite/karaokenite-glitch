module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@emotion",
      {
        sourceMap: true,
        autoLabel: "always",
        labelFormat: "[local]",
      },
    ],
  ],
};
