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
    // Same effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  PRODUCTION_PLUGINS = [];
}

const externals = Object.keys(require(`./package.json`).dependencies)
  .filter(key => [`react-fa`, `fixed-data-table`].indexOf(key) === -1)
  .map(key => new RegExp(`^${key}(\S+)?\$`));

export default {
  output: {
    path: resolvePath(__dirname, `./public/assets`),
    pathinfo: process.env.NODE_ENV !== `production`,
    filename: `[name].js`,
    libraryTarget: `commonjs2`,
  },
  target: `node`,
  externals,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: `null`,
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: `babel`,
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
