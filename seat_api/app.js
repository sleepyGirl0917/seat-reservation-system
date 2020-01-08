const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
// const cors = require('cors');
const indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置模版文件夹的路径
app.set('view engine', 'ejs'); // 设置使用的模版引擎
//托管静态文件
app.use(express.static('public'));

// 配置session
app.use(session({
  secret: 'secret', 
  resave: false, // 每次请求是否都更新session
  saveUninitialized: true, //初始化时是否保存数据
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 依靠cookie保存24小时
  },
}));

app.use(logger('dev')); // 将请求信息打印在控制台
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 使用静态资源文件夹的绝对路径
//配置路由
app.use('/', indexRouter);

// 设置跨域
/* app.use(cors({
  'origin': ['http://127.0.0.1:8080', 'http://localhost:8080'],
  'credentials': true
})); */

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //支持cookie
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(8090);

module.exports = app;