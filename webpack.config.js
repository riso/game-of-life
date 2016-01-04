var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NyanProgressPlugin = require("nyan-progress-webpack-plugin");

var env = process.env.ENVIRONMENT || "DEV";

var config = {
  context: path.join(__dirname, "src"),
  entry: {
    baxi: ["./main.js"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      // required to write "require('./style.css')"
      {
        test: /\.css$/,
        loader: "style!css?sourceMap"
      }, {
        test: /\.scss$/,
        loader: "style!css?sourceMap!sass?sourceMap"
      },
      // required for images and bootstrap icons
      {
        test: /\.(ttf|eot|svg|png|gif|jpg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: (env === "DEV")
    })
  ]
};


if (env === "DEV") config.plugins.push(new NyanProgressPlugin());

module.exports = config;
