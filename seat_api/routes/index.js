const pool = require('../db/pool');
const express = require('express');
const router = express.Router();

let user = {};

//获取手机验证码
router.post('/api/getPhoneCode', (req, res) => {
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
    setTimeout(() => {
      user.phoneCode = null;
    }, 1000 * 60 * 5)
  }
});

// 手机验证码登录
router.post('/api/phoneLogin', (req, res) => {
  let { phone, phoneCode } = req.body;
  if (user[phone] === phoneCode) {
    let sql = 'SELECT * from t_user WHERE phone = ? LIMIT 1 ;';
    pool.query(sql, [phone], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {// 用户存在
        req.session.userId = result[0].user_id;
        res.cookie('user_id', result[0].user_id);
        res.send({ success_code: 200, message: '登录成功' });
      } else {// 用户不存在，注册为新用户
        let sql = 'INSERT INTO t_user(user_name,phone,password) VALUES(?,?,?)';
        pool.query(sql, [phone, phone, 123456], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            req.session.userId = result.insertId;
            res.cookie('user_id', result.insertId, { maxAge: 1000 * 60 * 60 * 24 }); // cookie保持24小时
            res.send({ success_code: 200, message: '注册成功，已登录' })
          }
        })
      }
    })
  } else {
    res.send({ error_code: 1, message: '验证码错误' })
  }
});

//密码登录
router.post('/api/pwdLogin', function (req, res) {
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
router.get('/api/getUserInfo', (req, res) => {
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


module.exports = router;