const path = require("path");
const webpack = require("webpack");
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");

const env = process.env.ENVIRONMENT || "DEV";

const config = {
  entry: {
    gol: ["./main.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
        },
      },
      // required to write "require('./style.css')"
      {
        test: /\.css$/,
        loader: "style!css?sourceMap",
      }, {
        test: /\.scss$/,
        loader: "style!css?sourceMap!sass?sourceMap",
      },
      // required for images and bootstrap icons
      {
        test: /\.(ttf|eot|svg|png|gif|jpg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: (env === "DEV"),
    }),
  ],
};


if (env === "DEV") config.plugins.push(new NyanProgressPlugin());

module.exports = config;
