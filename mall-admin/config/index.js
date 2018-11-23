var path = require('path')

function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

module.exports = {
  dev: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    port: 8080,
    devtool: 'cheap-module-eval-source-map',
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    proxyTable: {}
  },
  build: {
    assetsRoot: resolve('../../adminBuild/dist'),
    assetsPublicPath: './',
    assetsSubDirectory: 'static'
  }
}