const pool = require('./db/pool');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 创建web服务器
var app = express();
app.listen(3000, () => {
  console.log('running--------')
});

// 配置跨域
/* app.use(cors({
  'origin': ['http://127.0.0.1:8080', 'http://localhost:8080'],
  'credentials': true
})); */

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //支持cookie
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 配置session
app.use(session({
  secret: 'secret', 
  resave: false, // 每次请求是否都更新session
  saveUninitialized: true, //初始化时是否保存数据
  cookie: {
    maxAge: 1000 * 60 * 60 * 8, // 依靠cookie保存8小时
  },
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let user = {};

//获取手机验证码
app.post('/api/getPhoneCode', (req, res)=> {
  let phone = req.body.phone;
  let phoneCode = Math.random().toFixed(4).slice(-4) + "";
  if (!phoneCode) {
    res.send({ error_code: 1, message: '获取验证码失败' });
  } else {
    // user.phone = phone;
    // user.phoneCode = phoneCode;
    user[phone] = phoneCode;
    console.log(user)
    res.send({ success_code: 200, data: phoneCode });
    // 验证码5分钟后失效
    setTimeout(()=>{ 
      user.phoneCode = null;
    }, 1000 * 60 * 5)}
});

// 手机验证码登录
app.post('/api/phoneLogin', (req, res) => {
  let {phone,phoneCode}=req.body;
  if (user[phone] === phoneCode) {
    let sql = 'SELECT * from t_user WHERE phone = ? LIMIT 1 ;';
    pool.query(sql, [phone], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {// 用户存在
        req.session.userId = result[0].user_id;
        res.cookie('user_id', result[0].user_id);
        res.send({ success_code: 200 ,message:'登录成功'});
      } else {// 用户不存在，注册为新用户
        let sql = 'INSERT INTO t_user(user_name,phone,password) VALUES(?,?,?)';
        pool.query(sql, [phone, phone, 123456], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            req.session.userId = result.insertId;
            res.cookie('user_id', result.insertId);
            res.send({ success_code: 200 ,message:'注册成功，已登录'})
          }
        })
      }
    })
  } else {
    res.send({ error_code: 1, message: '验证码错误' })
  }
});

//密码登录
app.post('/api/pwdLogin', function (req, res) {
  let name = req.body.userName;
  let pwd = req.body.password;
  let sql = 'SELECT * from t_user WHERE user_name =? LIMIT 1 ;'
  pool.query(sql, [name], (err, result) => {
    if (err) {
      res.send({ error_code: 1, message: '查询用户失败' });
    } else {
      result = JSON.parse(JSON.stringify(result));
      if (result[0]) {
        if (result[0].password === pwd) {
          //保存用户id
          req.session.userId = result[0].user_id;
          res.cookie('user_id', result[0].user_id);
          res.send({ success_code: 200 })
        } else {
          res.send({ error_code: 1, message: '密码错误' });
        }
      } else {
        res.send({ error: 1, message: '用户不存在' });
      }
    }
  })
});

//获取用户信息
app.get('/api/getUserInfo', (req, res) =>{
  let userId = req.query.userId;
  if (userId) {
    let sql = 'SELECT * from t_user WHERE user_id = ? LIMIT 1;';
    pool.query(sql, [userId], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取用户信息失败' });
      } else {
        result = JSON.parse(JSON.stringify(result));
        if (result[0]) {
          res.send({ success_code: 200, data: result[0] })
        } else {
          res.send({ error_code: 1, message: '用户信息不存在' });
        }
      }
    })
  }
});

// 退出登录