module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/SEAT-REVERSATION-SYSTEM/'
    : '/',
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
        ws: true,
        changeOrigin: true,
        pathRewrite: {  
          '^/': ''
        }
      }
    }
  }
}