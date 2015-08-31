"use strict";

var Path = require("path");
var webpack = require("webpack");

var commonDefinePlugin = require("./commonDefinePlugin");

var PRODUCTION_PLUGINS;

if ("production" === process.env.NODE_ENV) {
  PRODUCTION_PLUGINS = [
    // Safe effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  PRODUCTION_PLUGINS = [];
}

var externals = [
  require("./package.json").dependencies,
].reduce(function (acc, dependencies) {
  return acc.concat(
    Object.keys(dependencies)
      .filter(function (key) { return -1 === ["react-fa", "fixed-data-table"].indexOf(key); })
      .map(function (key) { return new RegExp("^" + key + "(/\\S+)?$"); })
  );
}, []);

module.exports = {
  context: __dirname,
  reacthtmlpackExtraEntry: {
    "../cloud/main": "./src/parse.js",
  },
  output: {
    path: Path.resolve(__dirname, "./public"),
    filename: "[name].js",
    libraryTarget: "umd",
  },
  target: "node",
  externals: externals,
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
  ].concat(PRODUCTION_PLUGINS),
};
