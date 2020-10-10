const express = require('express');
const proxy = require("http-proxy-middleware");
const myProxy = express();

// // 配置反向代理
// myProxy.use("/api/*", proxy({
//   // api的地址
//   target: "http://127.0.0.1:8090",
//   changeOrigin: true,
//   pathRewrite: {
//     "^/api/": "/"
//   }
// }));

// myProxy.use("/img/*", proxy({
//   // api的地址
//   target: "http://127.0.0.1:8090",
//   changeOrigin: true,
// }));

// /* myProxy.use("/", proxy({
//   // vue/react启动后需要访问网页的地址（开发模式）
//   // target: "http://127.0.0.1:5000",
//   target: "http://127.0.0.1:8000",
//   changeOrigin: true,
// })); */

// myProxy.use("/", proxy({
//   // vue/react启动后需要访问网页的地址
//   // 生产模式：静态资源放到了另外一个服务器上
//   target: "http://127.0.0.1:8081",
//   changeOrigin: true,
//   pathRewrite:{
//     "^/":"/dist/"
//   }
// }));

module.exports = myProxy;