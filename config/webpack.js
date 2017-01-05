var env = process.env.NODE_ENV;
var pkg = require("../package.json");

var webpack = require("webpack");
var validate = require("webpack-validator");
var merge = require("webpack-merge");

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var base = {
  context: path.join(__dirname, ".."),
  entry: [
    "font-awesome/css/font-awesome.css",
    "./src/app.global.css",
    "./src/index." + env
  ],
  output: {
    path: "dist/",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }, {
      test: /\.css$/,
      include: /node_modules|\.global\./,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: pkg.name }),
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    new webpack.NoErrorsPlugin()
  ]
};

var dev = {
  debug: true,
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch"
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        "style-loader?sourceMap",
        "css-loader?modules&importLoaders=1",
        "resolve-url-loader",
        "postcss-loader?syntax=postcss-scss"
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    open: true
  },
  postcss: function () {
    return [
      require("precss"),
      require("autoprefixer")
    ];
  }
};

var prd = {
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        "style-loader",
        "css-loader?modules&importLoaders=1",
        "resolve-url-loader",
        "postcss-loader?syntax=postcss-scss"
      ]
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ["module", "exports", "require"]
      }
    })
  ],
  postcss: function () {
    return [
      require("precss"),
      require("autoprefixer"),
      require("cssnano")
    ];
  }
};

module.exports = validate({
  development: merge(dev, base),
  production: merge(base, prd)
}[env]);
