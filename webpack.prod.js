const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    chunkIds: 'named',
    emitOnErrors: true,
    splitChunks : {
      chunks: 'all',
      minSize: 10000,
      maxSize: 244000,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new Dotenv({
      path: 'env/.env',
      safe: true,
      systemvars: true,
    })
  ]
});