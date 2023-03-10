// development config
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    './front-end/index.tsx', // the entry point of our app
  ],
  output: {
    publicPath: '/',
  },
  devServer: {
    open: true,
    hot: true, // enable HMR on the server
    historyApiFallback: true,
    static: './dist',
    client: {
      overlay: false,
    },
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  ],
})
