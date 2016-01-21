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

if (process.env.NODE_ENV === `production`) {
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
    path: resolvePath(__dirname, `./public/assets`),
    pathinfo: process.env.NODE_ENV !== `production`,
    publicPath: `assets/`,
    filename: `[name].js`,
  },
  target: `node`,
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: `babel`,
      },
      {
        test: /\.css$/,
        loader: `null`,
      },
    ],
  },
  plugins: [
    commonDefinePlugin,
    new webpack.EnvironmentPlugin(`NODE_ENV`),
    new webpack.ProvidePlugin({
      atob: `atob`,
      btoa: `btoa`,
    }),
    ...PRODUCTION_PLUGINS,
  ],
};
