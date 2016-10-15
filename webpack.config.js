/**
 * Created by Vyacheslav Shimarulin
 * See https://webpack.github.io/docs/configuration.html
 *
 * == SHIMMING MODULES ==
 * In some cases webpack cannot parse some file, because it has a unsupported module format
 * or isn’t even in a module format. Therefore you have many options to convert the file into a module.
 * https://webpack.github.io/docs/shimming-modules.html
 *
 * == Postccs ==
 * plugin list - https://github.com/postcss/postcss/blob/master/docs/plugins.md
 * === postcss-cssnext ===
 * Home - http://cssnext.io/postcss/
 * Usage - https://github.com/MoOx/postcss-cssnext/blob/master/docs/content/usage.md
 * === Autoprefixer (use as part of postcss-cssnext)
 * Home - https://github.com/postcss/autoprefixer
 * Browserslist home - https://github.com/ai/browserslist#queries
 * === CSS MQPacker ===
 * Home - https://github.com/hail2u/node-css-mqpacker
 */

'use strict';

let
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const
  NODE_ENV = process.env.NODE_ENV,
  PUBLIC_PATH = process.env.PUBLIC_PATH;

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'app': './index'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: PUBLIC_PATH ? PUBLIC_PATH : 'dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].js'
  },

  /** Watch mode */
  watch: NODE_ENV == 'development',

  /** Delay the rebuilt after the first change. Value is a time in ms */
  watchOptions: {
    aggregateTimeout: 100,
    poll: 1000
  },

  devtool: NODE_ENV == 'development' ? 'inline-source-map' : null, // inline-source-map|eval

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap', {publicPath: ''})
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=10000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: NODE_ENV == 'development',
      compress: { warnings: false }
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].bundle.css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '../index.html',
      minify: NODE_ENV == 'production' ?
      {
        removeAttributeQuotes: true,
        caseSensitive: true,
        collapseWhitespace: true
      } : false,
      cache: false
    })
  ]
};
