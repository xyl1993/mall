var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
const devProxyPath = 'http://localhost:8002/';

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseWebpackConfig, {

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: false,
    disableHostCheck: true,
    port: 4000,
    open: true,
    host: 'localhost',
    inline: true, //实时刷新
    // quiet: true, // necessary for FriendlyErrorsPlugin
    stats: {
      // colors: true,
      chunks: false
    },
    proxy: {
      '/mall/api/*': {
        target: devProxyPath 
      }
    }
  },
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  mode: 'development',

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    }
  },
  plugins: [
    // new UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: function () {
          return [autoprefixer, cssnext, precss, cssnano];
        },
        noParse: /node_modules\/(jquey|moment|chart\.js)/
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, '../src/index.html'),
      inject: true,
      filename: 'index.html',
      favicon: path.resolve(ROOT_PATH, '../src/assets/favicon.ico')
    }),
  ]

})