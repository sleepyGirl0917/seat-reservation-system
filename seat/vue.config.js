const webpack = require("webpack")
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? 'http://182.92.118.167:80/dist/' : '/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件 
  productionSourceMap: false,
  // webpack相关配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: "gzip",
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 删除懒加载模块的 prefetch preload
      config.plugins
        .delete('prefetch')
        .delete('preload')
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    };
    // 将vue标签内样式px转换vw
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
      .loader('style-vw-loader')
      .options({
        unitToConvert: 'px',
        viewportWidth: 750,
        viewportUnit: 'vw',
      })
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,       // 是否自动打开页面
    host: '0.0.0.0',  // 域名
    port: '8000',     // 端口号
    https: false,     // 是否使用https
    hotOnly: false,   // 热更新
    proxy: {
      // 配置跨域
      '/': {
        target: process.env.VUE_APP_ROOT_API,  //'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false, // 如果是https接口，则需要配置这个参数
        // pathRewrite: {  
        //   '^/': ''
        // }
      }
    }
  },
  css: {
    extract: true
  }
}