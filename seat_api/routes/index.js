require('../util/util');
const pool = require('../db/pool');
const express = require('express');
const router = express.Router();


let user = {};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 加载店铺信息
router.get('/api/getShopInfo', (req, res) => {
  let sql = 'SELECT shop_id,shop_name,address FROM t_shop';
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result[0]) {
      res.send({ success_code: 200, data: result })
    } else {
      res.send({ error_code: 1, message: '获取店铺信息失败' })
    }
  })
})

// 获取已被预定的座位
router.post('/api/getSeatSoldInfo', (req, res) => {
  let { shopId, dateVal, startVal, endVal } = req.body;
  let seat = [];
  let sql = 'SELECT A.order_date,A.start_time,A.end_time,B.seat_id from t_order A,t_shop_seat B WHERE A.sid=B.sid';
  sql += ' AND A.shop_id= ? AND A.order_date=? AND A.start_time<=? AND A.end_time>=?';
  // 除A.start_time>endVal OR A.end_val<startVal以外
  pool.query(sql, [shopId, dateVal, endVal, startVal], (err, result) => {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      seat.push(result[i].seat_id)
    }
    res.send({ success_code: 200, data: seat, detail: result })
  })
})

// 获取座位被预定的时段详情
router.post('/api/getSeatSoldDetail', (req, res) => {
  let { shopId, dateVal, seatId } = req.body;
  let sql = 'SELECT A.start_time,A.end_time FROM t_order A,t_shop_seat B WHERE A.sid=B.sid'
  sql += ' AND A.shop_id=? AND A.order_date=? AND B.seat_id=?';
  pool.query(sql, [shopId, dateVal, seatId], (err, result) => {
    if (err) throw err;
    if (result[0]) {
      res.send({ success_code: 200, data: result })
    }
  })
})

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
    let sql = 'SELECT user_id from t_user WHERE phone = ? LIMIT 1 ;';
    pool.query(sql, [phone], (err, result) => {
      if (err) throw err;
      if (result[0]) {// 用户存在
        req.session.userId = result[0].user_id;
        res.cookie('user_id', result[0].user_id);
        res.send({ success_code: 200, message: '登录成功', data: result[0] });
      } else {// 用户不存在，注册为新用户
        let sql = 'INSERT INTO t_user(user_name,phone,password) VALUES(?,?,?);';
        pool.query(sql, [phone, phone, 123456], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            req.session.userId = result.insertId;
            res.cookie('user_id', result.insertId, { maxAge: 1000 * 60 * 60 * 24 }); // cookie保持24小时
            let sql = `SELECT user_id from t_user WHERE phone =${phone} LIMIT 1 ;`;
            pool.query(sql, (err, result) => {
              if (err) throw err;
              if (result[0]) {
                res.send({ success_code: 200, message: '注册成功，已登录', data: result[0] })
              }
            })
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
  let sql = 'SELECT user_id from t_user WHERE user_name =? LIMIT 1 ;'
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
          res.send({ success_code: 200, message: '登录成功', data: result[0] })
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
router.post('/api/getUserInfo', (req, res) => {
  /* if (!req.session.userId) {
    res.send({ error_code: -1, message: "请登录" });
    return;
  }
  let userId = req.session.userId; */
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT user_id,user_name,avatar,phone,balance FROM t_user WHERE user_id = ?';
    pool.query(sql, [userId], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取用户信息失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result[0] })
        } else {
          res.send({ error_code: 1, message: '用户信息不存在' });
        }
      }
    })
  }
});

// 获取用户会员卡信息
router.post('/api/getVipInfo', (req, res) => {
  let userId = req.body.userId;
  let sql = 'SELECT A.recharge_id,A.recharge_num,A.recharge_type,A.deadline,A.balance FROM t_recharge A,t_user B WHERE A.user_id=B.user_id AND A.user_id=? AND A.deadline>=NOW()';
  pool.query(sql, [userId], (err, result) => {
    if (err) throw err;
    if (result[0]) {
      res.send({ success_code: 200, data: result })
    }
  })
})

// 预定座位
router.post('/api/orderSeat', (req, res) => {
  let { userId, shopId, dateVal, startVal, endVal, seatId, cardType, rechargeId } = req.body;
  let time = new Date('2019/1/1' + " " + endVal).getTime() - new Date('2019/1/1' + " " + startVal).getTime();
  let unit = 1000 * 60 * 30;
  let sql = 'SELECT sid,seat_type,seat_price FROM t_shop_seat WHERE shop_id=? AND seat_id=?;';
  sql += ' SELECT count(*) AS length FROM t_order;';
  pool.query(sql, [shopId, seatId], (err, result) => {
    if (err) throw err;
    let { sid, seat_type, seat_price } = result[0][0];
    let orderCost = Math.ceil(time / unit) * 0.5 * seat_price;
    let sysDate = new Date().Format('yyyyMMddhhmmss'); // 生成系统时间
    let fn = (num, length) => (Array(length).join('0') + num).slice(-length);
    let id = fn(result[1][0].length, 4);
    let orderNum = "DZ" + sysDate + id; // 订单编号

    if (cardType == 1) { //储值卡：余额大于orderCost且在有效期内
      sql2 = `INSERT INTO t_order(user_id,shop_id,sid,order_date,start_time,end_time,order_cost,pay_type,order_num,pid)  
      SELECT '${userId}','${shopId}','${sid}','${dateVal}','${startVal}','${endVal}','${orderCost}','${cardType}','${orderNum}','${rechargeId}' FROM DUAL 
      WHERE (select balance from t_recharge where recharge_id=${rechargeId} and deadline>=NOW()) >=${orderCost};`
      // 更新会员卡余额
      sql2 += ` UPDATE t_recharge SET balance=balance-${orderCost} WHERE recharge_id = ${rechargeId} ;`;
      // 更新用户表余额（可以有多张储值卡）
      sql2 +=`UPDATE t_user AS A SET balance=(SELECT SUM(balance) FROM t_recharge AS B 
      WHERE A.user_id=B.user_id AND B.user_id=3 AND B.recharge_type=1 AND B.deadline>=NOW())`;
    } else if (cardType == 2&&seat_type==0) { //包时卡：在有效期内且只能订单人座
      sql2 = `INSERT INTO t_order(user_id,shop_id,sid,order_date,start_time,end_time,order_cost,pay_type,order_num,pid) 
      SELECT '${userId}','${shopId}','${sid}','${dateVal}','${startVal}','${endVal}','${orderCost}','${cardType}','${orderNum}','${rechargeId}' FROM DUAL 
      WHERE (select deadline from t_recharge where recharge_id=${rechargeId} )>=NOW();`;
    }else{
      res.send({error_code: 1, message: '订座失败'})
      return;
    }

    pool.query(sql2, (err, result) => {
      if (err) throw err;
      // console.log(result)
      if (result[0].affectedRows > 0) {
        res.send({ success_code: 200, message: '订座成功' })
      } else {
        res.send({ error_code: 1, message: '订座失败' })
      }
    })
  })

})

// 获取距离最近的可用订座信息
router.post('/api/getOrderLatest', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,B.shop_name,C.seat_id,C.seat_type,C.seat_info,A.order_date,A.start_time,A.end_time from t_order A';
    sql += ' LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid';
    sql += ' WHERE A.user_id = ? AND A.order_status=? LIMIT 1;';
    pool.query(sql, [userId, 0], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座信息失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result[0] })
        } else {
          res.send({ error_code: 1, message: '当天没有可用的订座信息' });
        }
      }
    })
  }
});

// 获取所有订座信息
router.post('/api/getOrderAll', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,B.shop_name,C.seat_id,C.seat_type,C.seat_info,A.order_date,A.start_time,A.end_time from t_order A';
    sql += ' LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid';
    sql += ' WHERE A.user_id = ? AND A.order_status=?;';
    pool.query(sql, [userId, 0], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座信息失败' });
      } else {
        // console.log(result)
        if (result.length) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
});

// 获取订单详情
router.post('/api/getOrderDetails', (req, res) => {
  let { userId, orderId } = req.body;
  let sql = 'SELECT A.order_id,A.order_status,B.shop_name,C.seat_id,C.seat_type,C.seat_info,A.order_date,A.start_time,A.end_time,A.pid from t_order A';
  sql += ' LEFT JOIN t_shop B on A.shop_id=B.shop_id';
  sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid';
  sql += ' WHERE A.user_id = ? AND A.order_id=? ;';
  pool.query(sql, [userId, orderId], (err, result) => {
    if (err) {
      res.send({ error_code: 1, message: '获取订座信息失败' });
    } else {
      // console.log(result)
      if (result[0]) {
        res.send({ success_code: 200, data: result[0] })
      } else {
        res.send({ error_code: 1, message: '没有订座信息' });
      }
    }
  })
});

// 取消订单
router.post('/api/cancelOrder', (req, res) => {
  let { userId, orderId,rechargeId } = req.body;
  let sql = 'UPDATE t_order SET order_status=?,order_refund=order_cost,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
  sql += 'UPDATE t_recharge SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE recharge_id =?;';
  sql += 'UPDATE t_user SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE user_id = ?;';
  pool.query(sql, [1, userId, orderId, orderId, rechargeId,orderId,userId], (err, result) => {
    if (err) throw err;
    // console.log(result)
    if(result[0].affectedRows>0){
      res.send({ success_code: 200, message: '取消订座执行完毕' });
    }
  })
})

// 结束订单
router.post('/api/endOrder', (req, res) => {
  let { userId, orderId,rechargeId } = req.body;
  let timeBefore, timeNow, distance, refund;
  // 获得当天已完结的订单时长
  let sql = 'SELECT SUM(TIMESTAMPDIFF(minute, start_time,status_change_time)) AS time FROM t_order';
  sql += ' WHERE order_status=? AND user_id=? AND date(start_time)=date(NOW());';
  pool.query(sql, [2, userId], (err, result) => {
    if (err) throw err;
    timeBefore = Math.ceil(result[0].time / 30);
    if (timeBefore < 12) { // 还没有达到封顶时长，需要计算应返还的费用  4.5：单人座半小时费用  10：双人座半小时费用
      sql = 'SELECT TIMESTAMPDIFF(minute, start_time,NOW()) as time,order_cost FROM t_order where user_id=? AND order_id =?';
      pool.query(sql, [userId, orderId], (err, result) => {
        if (err) throw err;
        timeNow = Math.ceil(result[0].time / 30);
        distance = 12 - timeBefore; // 离封顶时长的距离
        if (timeNow >= distance) { // 到达封顶时长，应付distance*4.5，返还=已付-应付
          refund = result[0].order_cost - distance * 4.5
        } else { // 未到达封顶时长
          refund = result[0].order_cost - timeNow * 4.5
        }
        // console.log(refund)
        sql = 'UPDATE t_order SET order_status=?,order_refund=?,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        sql += 'UPDATE t_recharge SET balance=balance+? WHERE recharge_id =?;';
        sql += 'UPDATE t_user SET balance=balance+? WHERE user_id = ?;';
        pool.query(sql, [2, refund, userId, orderId, refund, rechargeId,refund, userId], (err, result) => {
          if (err) throw err;
          if(result[0].affectedRows>0){
            res.send({ success_code: 200, message: '结束订座执行完毕' });
          }
        })
      })
    } else { // 已经达到封顶时长，退还订座费用
      sql = 'UPDATE t_order SET order_status=?,order_refund=order_cost,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
      sql += 'UPDATE t_recharge SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE recharge_id =?;';
      sql += 'UPDATE t_user SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE user_id = ?;';
      pool.query(sql, [2, userId, orderId, orderId, rechargeId,orderId, userId], (err, result) => {
        if (err) throw err;
        if(result[0].affectedRows>0){
          res.send({ success_code: 200, message: '结束订座执行完毕' });
        }
      })
    }
  })
})

// 获取所有订座记录
router.post('/api/getMyDataAll', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    // 订单编号，店铺名，座位信息，下单时间，支付方式
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ?;';
    pool.query(sql, [userId], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 获取延长时段记录
router.post('/api/getMyDataDelay', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.is_delay=?;';
    pool.query(sql, [userId, 1], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 获取取消订单记录
router.post('/api/getMyDataCancel', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=?;';
    pool.query(sql, [userId, 1], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 获取完成订单记录
router.post('/api/getMyDataEnd', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=?;';
    pool.query(sql, [userId, 2], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 获取逾期订单记录
router.post('/api/getMyDataOverdue', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=?;';
    pool.query(sql, [userId, 3], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 获取消费详情
router.post('/api/getPurchaseDetails', (req, res) => {
  let { userId, orderId } = req.body;
  if (userId) {
    let sql = 'SELECT shop_name,order_num,order_date,start_time,end_time,order_cost,order_refund,is_delay,pay_time,pay_type ';
    sql += ' FROM t_order A,t_shop B WHERE A.shop_id=B.shop_id  AND A.user_id = ? AND A.order_id=?;'
    pool.query(sql, [userId, orderId], (err, result) => {
      if (err) {
        res.send({ error_code: 1, message: '获取订座记录失败' });
      } else {
        // console.log(result)
        if (result[0]) {
          res.send({ success_code: 200, data: result[0] })
        } else {
          res.send({ error_code: 1, message: '没有订座信息' });
        }
      }
    })
  }
})

// 退出登录
router.get("/api/logout", (req, res) => {
  req.session.userId = null;
  res.clearCookie('user_id');
  res.send({ success_code: 200, message: "已退出" });
});

module.exports = router;