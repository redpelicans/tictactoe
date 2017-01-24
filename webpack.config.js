const path = require('path');
const R = require('ramda');
const webpack = require('webpack');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = () => nodeEnv === 'production';
const isDev = () => nodeEnv === 'development';
const ifProd = plugin => (isProd() ? plugin : null);
const ifDev = plugin => isDev() ? plugin : null;
const compact = R.filter(x => !R.isNil(x));

const webpackConfig = {
  devtool: config.devtool,
  devServer: config.devServer || {},
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/assets/',
  },
  entry: {
    app: './client/src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: compact([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    ifDev(new webpack.HotModuleReplacementPlugin()),
  ]),
  performance: {
    hints: false,
  },
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false,
  },
};

module.exports = webpackConfig;
