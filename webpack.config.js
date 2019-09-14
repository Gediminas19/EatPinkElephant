const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const STATIC_ROOT = path.resolve('./static');

module.exports = {
  context: __dirname,

  entry: {
    'main': './static/index.js',
  },

  output: {
    'path': path.resolve(STATIC_ROOT, "dist/"),
    'filename': "[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'}, // don't use this in development
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ // add globally reachable scss directories
                path.resolve(STATIC_ROOT, "scss"),
                path.resolve(STATIC_ROOT, "templates/modules"),
              ],
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // don't use this in development
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new BundleTracker({filename: "./webpack-stats.json"}),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].bundle.css",
    }),
  ],
};
