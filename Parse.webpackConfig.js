import {
  resolve as resolvePath,
} from "path";

import {
  default as webpack,
} from "webpack";

import {
  default as commonDefinePlugin,
} from "./commonDefinePlugin";

let PRODUCTION_PLUGINS;

if ("production" === process.env.NODE_ENV) {
  PRODUCTION_PLUGINS = [
    // Safe effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  PRODUCTION_PLUGINS = [];
}

export default {
  context: __dirname,
  output: {
    path: resolvePath(__dirname, "./public/assets"),
    pathinfo: "production" !== process.env.NODE_ENV,
    filename: "[name].js",
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel",
      },
      {
        test: /\.css$/,
        loader: "null",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin("NODE_ENV"),
    commonDefinePlugin,
    new webpack.ProvidePlugin({
      "atob": "atob",
      "btoa": "btoa",
      "Promise": "bluebird",
    }),
    ...PRODUCTION_PLUGINS,
  ],
};
