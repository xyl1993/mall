const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//显示进度
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//happypack多进程打包
const HappyPack = require('happypack')
const os = require('os') //获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

var utils = require('../build/utils');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var publicPath = process.env.NODE_ENV === 'development' ? "http://localhost:4000/" : './';

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

process.traceDeprecation = true;
let entry = {
  build: ['./src/app/app.js'],
};
if (process.env.NODE_ENV === 'development') {
  entry.vendor = [];
}

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(ROOT_PATH, '../../admin/dist'),
    publicPath: publicPath,
    filename: process.env.NODE_ENV === 'development' ? '[name].js' : utils.assetsPath('js/[name]_[chunkhash].js'),
    pathinfo: process.env.NODE_ENV === 'development' ? true : false
  },
  resolve: {
    extensions: ['.js', '.css', '.vue', '.json'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      // jquery: 'jquery/jquery.min.js',
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'scss_vars': '@/assets/common/styles.scss'
    }
  },
  module: {
    noParse: /(element-ui\.js)/,
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader',
            sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?sourceMap",
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                }),
              ]
            }
          }

        ]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader?sourceMap", //开发模式
          "sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
        ]
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader?cacheDirectory',
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, 'src')
      }, {
        test: /\.(png|jpg|gif|cur)$/,
        use: ["url-loader?limit=8192&name=images/[hash:8].[name].[ext]"]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?.*$|$)/,
        use: ["url-loader?importLoaders=1&limit=10000&name=fonts/[name].[ext]"]
      }, {
        test: /\.html$/,
        use: ["html-withimg-loader"]
      }
    ]
  },

  // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-eval-source-map
  // devtool: 'eval', //开发环境cheap-module-eval-source-map
  externals: {
    jquery: "jQuery", //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    // /*多进程压缩打包*/
    new HappyPack({ //开启多线程打包
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
  ]
}