const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/ant-theme-vars.less'), 'utf8'));

module.exports = {
  entry: {
    main: './src/index.tsx',
    'pdf.worker': path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.less', '.ttf', '.jpg', '.svg'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'KinoLime',
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin(),
    new AntdDayjsWebpackPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /^pdfjs-dist$/,
      resource => {
          resource.request = path.join(__dirname, './node_modules/pdfjs-dist/webpack');
      },
    ),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node-modules/',
        use: [{
          loader: 'babel-loader',
          options: {}
        }]
      },
      {
        test: /\.ts|tsx$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript']
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              },
            },
          }
        ],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(pdf)$/,
        use: 'file-loader?name=[path][name].[ext]',
      }
      
    ]
  }
}