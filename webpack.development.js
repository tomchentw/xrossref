"use strict";
/**
 * __template__gist__: https://gist.github.com/tomchentw/368a93bb748ad9d576f1#file-webpack-config-js
 */
var Path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var IsomorphicReactPluginFactory = require("isomorphic-react-plugin-factory");
    
var publicDirPath = Path.resolve(__dirname, "./public");

var isomorphicReactPlugin = new IsomorphicReactPluginFactory({
  serverComponentPath: "../tmp/server.js",
  serverMarkupPath: "../tmp/html.js",
  htmlOutputFilename: "index.html",
});

var commonDefinePlugin = new webpack.DefinePlugin({
// https://www.google.com/analytics/web/?hl=en#dashboard/default/a41104589w100513541p104405838/
  "process.env.GOOGLE_ANALYTICS_TRACK_NUMBER": JSON.stringify("UA-41104589-15"),
  "process.env.GOOGLE_ANALYTICS_ID": JSON.stringify("104405838"), // Get this from https://ga-dev-tools.appspot.com/query-explorer/
});

var clientConfig = {
  entry: {
  // http://webpack.github.io/docs/hot-module-replacement-with-webpack.html#tutorial
    "assets/client": [
      require.resolve("webpack-dev-server/client/") + "?http://localhost:8080",
      "webpack/hot/dev-server",
      "./src/client.js",
    ],
  },
  output: {
    path: publicDirPath,
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"],
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
    new webpack.HotModuleReplacementPlugin(),
    isomorphicReactPlugin.clientPlugin,
    commonDefinePlugin,
    new ExtractTextPlugin("[name].css", {
      disable: true,
    }),
    new webpack.ProvidePlugin({
      "Promise": "bluebird",
      "fetch": "isomorphic-fetch",
    }),
  ],
};

var serverConfig = {
  entry: {
    "../tmp/server": "./src/server.js",
    "../tmp/html": "./src/html.js",
  },
  output: {
    path: publicDirPath,
    filename: "[name].js",
    library: true,
    libraryTarget: "commonjs2",
  },
  target: "node",
  externals: [
    "atob",
    "btoa",
    /* use the same library as node runtime */
    "bluebird",
    "debug",
    "fixed-data-table",
    "isomorphic-fetch",
    "material-ui",
    "react",
    "react/addons",
    "react-tap-event-plugin",
    "rx",
    "rx-react",
  ],
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loaders: [
          "null-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin("NODE_ENV"),
    isomorphicReactPlugin.serverPlugin,
    commonDefinePlugin,
    new webpack.ProvidePlugin({
      "atob": "atob",
      "btoa": "btoa",
      "Promise": "bluebird",
      "fetch": "isomorphic-fetch",
    }),
  ],
};

var parseConfig = {
  entry: {
    "main": "./src/parse.js",
  },
  output: {
    path: Path.resolve(__dirname, "./cloud"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin("NODE_ENV"),
    commonDefinePlugin,
  ],
};

var webpackConfigsArray = [
  clientConfig,
  serverConfig,
  parseConfig,
];

webpackConfigsArray.devServer = {
  hot: true,
  host: "localhost",
  contentBase: publicDirPath,
};

module.exports = webpackConfigsArray;
