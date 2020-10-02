const { override, addWebpackPlugin } = require("customize-cra");
const { InjectManifest } = require("workbox-webpack-plugin");
module.exports = (webpack, ...args) => {
  // remove GenerateSW plugin
  webpack.plugins.pop();
  const overridenConf = override(
    addWebpackPlugin(
      new InjectManifest({
        swSrc: "./src/custom-serviceWorker.js",
        swDest: "./service-worker.js",
      })
    )
  )(webpack, ...args);
  return overridenConf;
};

// const workboxPlugin = require("workbox-webpack-plugin");
// const path = require("path");

// module.exports = {
//   webpack: function (config, env) {
//     if (env === "production") {
//       const workboxConfigProd = {
//         swSrc: path.join(__dirname, "public", "custom-service-worker.js"),
//         swDest: "custom-service-worker.js",
//       };
//       config = removeSWPrecachePlugin(config);
//       config.plugins.push(new workboxPlugin.InjectManifest(workboxConfigProd));
//     }
//     return config;
//   },
// };

// function removeSWPrecachePlugin(config) {
//   const swPrecachePluginIndex = config.plugins.findIndex((element) => {
//     return element.constructor.name === "SWPrecacheWebpackPlugin";
//   });
//   if (swPrecachePluginIndex !== -1) {
//     config.plugins.splice(swPrecachePluginIndex, 1);
//   }
//   return config;
// }
