var env = process.env.NODE_ENV;
var pkg = require("../package.json");

var webpack = require("webpack");
var merge = require("webpack-merge");

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var genericNames = require("generic-names");
function localIdent(loaderContext, localIdentName, localName) {
  var fn = genericNames("[hash:base64]", {
    context: loaderContext
  });
  return fn(localName, loaderContext.resourcePath);
}

var base = {
  context: path.join(__dirname, ".."),
  entry: [
    "font-awesome/css/font-awesome.css",
    "./src/app.global.css",
    "./src/index." + env
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules|\.global\./,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: pkg.name }),
    new ExtractTextPlugin({
      filename: "bundle.css",
      allChunks: true,
      disable: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

var dev = {
  devtool: "inline-source-map",
  entry: ["react-hot-loader/patch"],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              getLocalIdent: localIdent
            }
          },
          {
            loader: "postcss-loader",
            options: {
              syntax: "postcss-scss",
              plugins: function() {
                return [require("precss"), require("autoprefixer")];
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: true,
        output: {
          path: path.resolve(__dirname, "../dist")
        }
      }
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    open: true
  }
};

var prd = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              getLocalIdent: localIdent
            }
          },
          {
            loader: "postcss-loader",
            options: {
              syntax: "postcss-scss",
              plugins: function() {
                return [
                  require("precss"),
                  require("autoprefixer"),
                  require("cssnano")
                ];
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        output: {
          path: path.resolve(__dirname, "../dist")
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      mangle: {
        except: ["module", "exports", "require"]
      }
    })
  ]
};

module.exports = {
  development: merge(dev, base),
  production: merge(base, prd)
}[env];
