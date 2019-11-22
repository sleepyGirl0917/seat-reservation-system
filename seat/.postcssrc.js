module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {}, // 用来处理元素容器宽高比
    "postcss-write-svg": { utf8: false }, // 用来处理移动端1px的解决方案
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是设计稿的宽度，一般是750，那么100vw=750px 即1vw对应设计稿的7.5px
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不指定
      unitPrecision: 3, // 指定`px`转换为视窗单位值后保留的小数点个数
      viewportUnit: 'vw',  // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，也可以设置为想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px` 
      exclude: /(\/|\\)(node_modules)(\/|\\)/  // 打包后第三方库的px也被转换成vw，添加exclude选项，将node_modules目录排除掉，即不会受影响
    },
    "postcss-viewport-units": {filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1}, //过滤content警告
    "cssnano": { //压缩和清理CSS代码
      preset: "advanced",
      autoprefixer: false, // cssnano和cssnext同样具有autoprefixer，仅保留一个
      "postcss-zindex": false
    }
  }
}


