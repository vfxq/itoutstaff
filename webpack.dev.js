const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const fs = require('fs');
const { merge, mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');


const dirPath = path.join(__dirname, './');
const certPath = `${dirPath}certs`;

const devConfig = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: {
        loader: "match",
        options: "merge",
      }
    }
  }
})(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    https: true,
    // proxy: {
    //   '*': {
    //     target: 'https://stage.itoutstaff.com',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: true,
    static: {
      publicPath: '/',
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      logging: 'info',
      overlay: false
    },
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(`${certPath}/dev.local.key`),
        cert: fs.readFileSync(`${certPath}/dev.local.crt`),
        ca: fs.readFileSync(`${certPath}/private.key`),
    },
    },
  },
  plugins: [
    new Dotenv({
      path: 'env/dev.env',
      safe: true,
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          }
        }]
      },
      {
        test: /\.ts|tsx$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          }
        }]
      },
    ]
  }
});

module.exports = devConfig;