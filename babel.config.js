module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "last 2 versions, ie >= 9",
        useBuiltIns: "usage"
      }
    ],
    "@babel/react"
  ];

  const ignore = [/[\/\\]core-js/, /@babel[\/\\]runtime/];

  const plugins = [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    "inline-react-svg",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          test: "./src/test"
        }
      }
    ],
    ["dynamic-import-node"]
  ];

  return {
    presets,
    ignore,
    plugins
  };
};
