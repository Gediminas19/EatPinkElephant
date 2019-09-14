const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const STATIC_ROOT = path.resolve('./static');

module.exports = {
  context: __dirname,
  mode: 'development',

  entry: {
    'main': './static/js/index.js',
    'login': './static/js/login.js',
    'order': './static/js/order.js',
    'serve': './static/js/serve.js',
    'status': './static/js/status.js',
  },
  devtool: 'inline-source-map',

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
      {
        test: /\.html$/,
        use: [
          'file-loader?name=[name].[ext]',
          'extract-loader',
          'html-loader',
        ]
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

  devServer: {
    contentBase: path.resolve(STATIC_ROOT, 'dist'),
    compress: true,
    port: 9000
  }
};
