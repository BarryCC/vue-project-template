'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',//子目录，一般存放css，js，image等文件
    assetsPublicPath: '/',//根目录
    proxyTable: {},//用于解决跨域问题

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,//变编译完成后自动在浏览器中打开
    errorOverlay: true,//浏览器错误提示
    notifyOnErrors: true,//跨平台错误提示
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,//使缓存失效

    cssSourceMap: true //代码压缩后定位
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),//打包后生成首页存放位子

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),//打包（用于生产环境）后文件存放位子
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
	//assetsPublicPath: './',

    /**
     * Source Maps
     * 在生产环境下不需要map文件，可设置为false
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
