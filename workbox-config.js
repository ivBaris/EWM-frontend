// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// const path = require("path");

// module.exports = (env) => {
//   const mode = env.mode ? env.mode : "production";

//   return {
//     mode,
//     entry: {
//       main: "./src/index.js",
//     },
//     output: {
//       filename: "[name].[chunkhash].js",
//       chunkFilename: "[name].[chunkhash].bundle.js",
//       path: path.resolve(__dirname, "dist"),
//     },
//     plugins: [
//       new webpack.HashedModuleIdsPlugin(),
//       new HtmlWebpackPlugin({
//         template: "./index.html",
//         minify: { collapseWhitespace: true, removeComments: true },
//         inject: false,
//       }),
//       new WorkboxWebpackPlugin.InjectManifest({
//         swSrc: "./src/src-sw.js",
//         swDest: "sw.js",
//       }),
//     ],
//     devtool: "source-map",
//   };
// };

module.exports = {
  globDirectory: "./build/",
  globPatterns: ["**/*.{html,js}"],
  swDest: "./build/sw.js",
  swSrc: "./public/sw.js",
};
