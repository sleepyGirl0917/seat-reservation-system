const webpack = require('webpack')
const path = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const cdn = {
  // 不从 bundle 中引用依赖 , 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter',
    axios: 'axios'
  },
  // 通过cdn方式使用
  js: [
    '//unpkg.com/vue@2.6.10/dist/vue.min.js',
    '//cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
    '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    '//unpkg.com/element-ui@2.10.1/lib/index.js',
    '//cdn.staticfile.org/mathjs/7.1.0/math.min.js'
  ],
  css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css']
}

module.exports = {
  publicPath: IS_PROD ? '/my-admin/' : '/',
  outputDir: IS_PROD ? 'dist' : 'devdist',
  assetsDir: 'assets',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,
  parallel: require('os').cpus().length > 1,
  pwa: {},

  // webpack相关配置
  configureWebpack: config => {
    // 忽略打包配置
    config.externals = cdn.externals

    if (IS_PROD) {
      // 开启 gzip 压缩
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions, // 所有匹配该正则的资源都会被处理。默认值是全部资源
        threshold: 10240, // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8
        deleteOriginalAssets: false // 是否删除原资源
      })
    }
  },

  // webpack相关配置
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      args[0].cdn = cdn // html中添加cdn
      args[0].title = '众独自习室订座后台管理系统' // html中设置title
      args[0].chunksSortMode = 'none' // 修复 Lazy loading routes Error
      return args
    })

    if (IS_PROD) {
      // 压缩图片
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('url-loader', 'image-webpack-loader')
        .loader('url-loader?limit=10240', 'image-webpack-loader')
        .options({
          bypassOnDebug: true,
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        })
        .end()

      // 删除懒加载模块的 prefetch preload
      config.plugins.delete('prefetch').delete('preload')

      // 压缩代码
      config.optimization.minimize(true)

      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },

  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 是否自动打开页面
    host: '0.0.0.0', // 域名
    port: '8080', // 端口号
    https: false, // 是否使用https
    hotOnly: true, // 热更新
    proxy: {
      // 配置跨域
      '/': {
        target: process.env.VUE_APP_API_2,
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false // 如果是https接口，则需要配置这个参数
      }
    }
  },

  css: {
    extract: IS_PROD, // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    sourceMap: false,
    loaderOptions: {
      scss: {
        // prependData: `@import "@/assets/css/index.scss";`
      }
    }
  }
}
