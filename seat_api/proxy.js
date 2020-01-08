const express = require('express');
const proxy = require("http-proxy-middleware");
const myProxy = express();

// 配置反向代理
myProxy.use("/api/*", proxy({
  // api的地址
  target: "http://127.0.0.1:8090",
  changeOrigin: true,
  pathRewrite: {
    "^/api/": "/"
  }
}));

myProxy.use("/img/*", proxy({
  // api的地址
  target: "http://127.0.0.1:8090",
  changeOrigin: true,
}));

myProxy.use("/", proxy({
  // vue/react启动后需要访问网页的地址
  target: "http://127.0.0.1:5000",
  // target: "http://www.baidu.com",
  changeOrigin: true,
}));

module.exports = myProxy;