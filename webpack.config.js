"use strict";
/**
 * __template__gist__: https://gist.github.com/tomchentw/368a93bb748ad9d576f1#file-webpack-config-js
 */
var Path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var IsomorphicReactPluginFactory = require("isomorphic-react-plugin-factory");
    
var outputPath = Path.resolve(__dirname, "./public");

var IS_PRODUCTION = "production" === process.env.NODE_ENV;
var IS_DEVELOPMENT = !IS_PRODUCTION;
var BABEL_LOADER = "babel-loader?stage=1";

var HOST = "127.0.0.1";
var PORT = "8001";

var isomorphicReactPlugin = new IsomorphicReactPluginFactory({
  serverComponentPath: "tmp/server.js",
  serverMarkupPath: "tmp/html.js",
  htmlOutputFilename: "index.html",
});

var clientConfig = {
  entry: {
    "assets/client": "./src/client.js",
  },
  output: {
    path: outputPath,
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loaders: [BABEL_LOADER],
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
    isomorphicReactPlugin.clientPlugin,
    new ExtractTextPlugin("[name].css", {
      disable: IS_DEVELOPMENT,
    }),
    new webpack.ProvidePlugin({
      "Promise": "bluebird",
      "fetch": "isomorphic-fetch",
    }),
  ],
};

if (IS_DEVELOPMENT) {
  // http://webpack.github.io/docs/hot-module-replacement-with-webpack.html#tutorial
  Object.keys(clientConfig.entry).forEach(function (key) {
    clientConfig.entry[key] = this.concat(clientConfig.entry[key]);
  }, [
    require.resolve("webpack-dev-server/client/") + "?http://" + HOST + ":" + PORT,
    "webpack/hot/dev-server"
  ]);

  clientConfig.module.loaders[0].loaders.unshift("react-hot-loader");

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else {
  clientConfig.entry = Object.keys(clientConfig.entry).reduce(function (acc, key) {
    acc[key.replace(/^assets\//, "")] = clientConfig.entry[key];
    return acc;
  }, {});

  clientConfig.output.publicPath = "assets/[hash]/";
  clientConfig.output.path = Path.resolve(outputPath, "./" + clientConfig.output.publicPath);

  clientConfig.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}

var serverConfig = {
  entry: {
    "tmp/server": "./src/server.js",
    "tmp/html": "./src/html.js",
  },
  output: {
    path: outputPath,
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
        loader: BABEL_LOADER,
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
    isomorphicReactPlugin.serverPlugin,
    new webpack.ProvidePlugin({
      "atob": "atob",
      "btoa": "btoa",
      "Promise": "bluebird",
      "fetch": "isomorphic-fetch",
    }),
  ],
};

var webpackConfigsArray = [
  clientConfig,
  serverConfig,
];

webpackConfigsArray.devServer = {
  hot: IS_DEVELOPMENT,
  host: HOST,
  port: PORT,
  contentBase: outputPath,
};

module.exports = webpackConfigsArray;
