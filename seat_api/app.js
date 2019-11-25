const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

// 创建web服务器
var app = express();
app.listen(3000, () => {
  console.log('running--------')
});
// 配置跨域
app.use(cors({
  'origin': ['http://127.0.0.1:3000', 'http://localhost:3000'],
  'credentials': true,
}));
// 配置session
app.use(session({
  secret: 'secret', 
  resave: false, // 每次请求是否都更新session
  saveUninitialized: true, //初始化时是否保存数据
  cookie: {
    maxAge: 1000 * 60 * 60* 24, // 依靠cookie保存24小时
  },
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// 登录判断 
app.get()