const webpack = require('webpack')

module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件 
  productionSourceMap: false,
  // webpack相关配置
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      // 生产环境
      config.mode = 'production'
    } else {      
      // 开发环境
      config.mode = 'development'
    }
  },  
  // webpack-dev-server 相关配置
  devServer: {
    open: false,    // 是否自动打开页面
    host: 'localhost',  // 域名
    port: '8000',   // 端口号
    https: false,   // 是否使用https
    hotOnly: true,  // 热更新
    proxy: {
      // 配置跨域
      '/': { 
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true, // websocket支持
        secure:false, // 如果是https接口，则需要配置这个参数
        pathRewrite: {  
          '^/': ''
        }
      }
    }
  }
}