var env = process.env.NODE_ENV;

var webpack = require("webpack");
var validate = require("webpack-validator");
var merge = require("webpack-merge");

var path = require("path");

var base = {
  target: "electron-main",
  context: path.join(__dirname, ".."),
  entry: ["babel-polyfill", "./app/main." + env],
  output: {
    path: "dist/",
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};

var dev = {};

var prd = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ["module", "exports", "require"]
      }
    })
  ]
};

module.exports = validate(
  {
    development: merge(base, dev),
    production: merge(base, prd)
  }[env]
);
