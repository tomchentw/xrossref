"use strict";

var Path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonDefinePlugin = require("./commonDefinePlugin");

var JSX_LOADER_LIST;
var FILENAME_FORMAT;
var PRODUCTION_PLUGINS;

if ("production" === process.env.NODE_ENV) {
  JSX_LOADER_LIST = ["babel"];
  FILENAME_FORMAT = "[name]-[chunkhash].js";
  PRODUCTION_PLUGINS = [
    // Safe effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  // For webpack-dev-server and HMR!!!
  JSX_LOADER_LIST = ["react-hot", "babel"];
  // When HMR is enabled, chunkhash cannot be used.
  FILENAME_FORMAT = "[name].js";
  PRODUCTION_PLUGINS = [];
}

module.exports = {
  devServer: {
    port: 8080,
    host: "localhost",
    contentBase: Path.resolve(__dirname, "./public"),
    publicPath: "/assets/",
    hot: true,
  },
  context: __dirname,
  output: {
    path: Path.resolve(__dirname, "./public/assets"),
    publicPath: "assets/",
    filename: FILENAME_FORMAT,
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loaders: JSX_LOADER_LIST,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", {
          publicPath: "",
        }),
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loaders: [
          "url-loader?limit=8192",
        ],
      }
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin("NODE_ENV"),
    commonDefinePlugin,
    new ExtractTextPlugin("[name]-[chunkhash].css", {
      disable: "production" !== process.env.NODE_ENV,
    }),
    new webpack.ProvidePlugin({
      "Promise": "bluebird",
    }),
  ].concat(PRODUCTION_PLUGINS),
};
