require('../util/util');
const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const multer = require('multer');

let user = {};

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 获取会员卡活动方案
router.get('/getPlan', (req, res) => {
  let sql = 'SELECT * FROM t_recharge_plan WHERE isActive=? AND recharge_type=?;'
  sql += 'SELECT * FROM t_recharge_plan WHERE isActive=? AND recharge_type=?;'
  pool.query(sql, [1,1,1,2], (err, result) => {
    if (err) throw err;
    if (result[0] && result[1]) {
      res.send({ success_code: 200, data: result })
    } else {
      res.send({ error_code: 1, message: '获取会员卡活动方案失败' })
    }
  })
})

// 加入会员
router.post('/joinMember', (req, res) => {
  let { userId, planId } = req.body;
  let sql = 'SELECT * FROM t_recharge_plan where plan_id =?'
  pool.query(sql, [planId], (err, result) => {
    if (err) throw err;
    let { recharge_money, recharge_send, recharge_time, recharge_type, effective_time } = result[0],
        balance = recharge_money + recharge_send;
    sql = 'SELECT date_add(now(), INTERVAL effective_time day) as deadline from t_recharge_plan WHERE plan_id=?'
    pool.query(sql, [planId],(err, result) => {
      if (err) throw err;
      let deadline = result[0].deadline;
      sql = 'INSERT INTO t_recharge VALUES (?,?,?,?,?,now(),?);'
      if (recharge_type == 1) {
        sql += 'UPDATE t_user AS A SET balance = (SELECT SUM(balance) FROM t_recharge AS B'
        sql += ' WHERE A.user_id = B.user_id AND B.user_id = ? AND B.recharge_type = ? AND B.deadline >= NOW())';
      }
      pool.query(sql, [null, userId, planId, recharge_type, balance, deadline,userId,1], (err, result) => {
        if (err) throw err;
        if (recharge_type == 1 && result[0].affectedRows > 0) {
          res.send({ success_code: 200, message: '储值卡充值成功' })
        } else if (recharge_type == 2 && result.affectedRows > 0) {
          res.send({ success_code: 200, message: '畅享卡充值成功' })
        } else {
          res.send({ error_code:1, message: '充值失败' })
        }
      })
    })
  })
})

// 加载店铺信息
router.get('/getShopInfo', (req, res) => {
  let sql = 'SELECT * FROM t_shop';
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
router.post('/getSeatSoldInfo', (req, res) => {
  let { shopId, dateVal, startVal, endVal } = req.body;
  let seat = [];
  let sql = 'SELECT A.order_date,A.start_time,A.end_time,B.seat_id from t_order A LEFT JOIN t_shop_seat B ON A.sid=B.sid ';
  sql += ' WHERE A.shop_id= ? AND A.order_date=? AND A.start_time<=? AND A.end_time>=? AND A.order_status IN(?,?)';
  // 除A.start_time>endVal OR A.end_val<startVal以外
  pool.query(sql, [shopId, dateVal, endVal, startVal, 0, 1], (err, result) => {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      seat.push(result[i].seat_id)
    }
    res.send({ success_code: 200, data: seat, detail: result })
  })
})

// 获取座位被预定的时段详情
router.post('/getSeatSoldDetail', (req, res) => {
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

//获取用户信息
router.post('/getUserInfo', (req, res) => {
  // if (!req.session.userId) {
  //   res.send({ error_code: -1, message: "请登录" });
  //   return;
  // }
  // let userId = req.session.userId;
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
router.post('/getVipInfo', (req, res) => {
  let userId = req.body.userId;
  let sql = 'SELECT A.recharge_id,A.recharge_type,A.deadline,A.balance FROM t_recharge A,t_user B';
  sql +=' WHERE A.user_id = B.user_id AND A.user_id =? AND A.deadline >= NOW() ORDER BY A.recharge_id'
  pool.query(sql, [userId], (err, result) => {
    if (err) throw err;
    // console.log(result)
    if (result[0]) {
      res.send({ success_code: 200, data: result });
    } else {
      res.send({ error_code: 1, message: '用户会员卡信息不存在' })
    }
  })
})

// 获取用户办卡记录
router.post('/getRechargeRecord',(req, res) =>{
  let userId = req.body.userId;
  let sql='SELECT * FROM recharge_history A LEFT JOIN t_recharge_plan B ON A.plan_id=B.plan_id WHERE A.user_id=?';
  pool.query(sql,[userId],(err,result)=>{
    if(err) throw err;
    if(result[0]){
      res.send({ success_code: 200, data: result });
    } else {
      res.send({ error_code: 1, message: '用户办卡记录不存在' })
    }
  })
})

// 预定座位
router.post('/orderSeat', (req, res) => {
  let { userId, shopId, dateVal, startVal, endVal, seatId, cardType, rechargeId } = req.body,
    time = endVal - startVal,
    unit = 1000 * 60 * 30;
  let sql = 'SELECT * FROM t_order WHERE user_id=? AND start_time<=? AND end_time>=? AND order_status IN(?,?)'
  pool.query(sql, [userId, endVal, startVal, 0, 1], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      sql = 'SELECT sid,seat_type,seat_price FROM t_shop_seat WHERE shop_id=? AND seat_id=?;';
      sql += ' SELECT count(*) AS length FROM t_order;';
      pool.query(sql, [shopId, seatId], (err, result) => {
        if (err) throw err;
        let { sid, seat_type, seat_price } = result[0][0];
        let duration=Math.ceil(time / unit);
        if(duration>=12) duration=12; // 6小时封顶
        let orderCost =  duration * 0.5 * seat_price;
        let sysDate = new Date().Format('yyyyMMddhhmmss'); // 生成系统时间
        let fn = (num, length) => (Array(length).join('0') + num).slice(-length);
        let id = fn(result[1][0].length + 1, 4);
        let orderNum = "DZ" + sysDate + id; // 订单编号
        if (cardType == 1) { //储值卡：余额大于orderCost且在有效期内
          sql2 = `INSERT INTO t_order(user_id,shop_id,sid,order_date,start_time,end_time,order_cost,pay_type,order_num,pid)  
      SELECT '${userId}','${shopId}','${sid}','${dateVal}','${startVal}','${endVal}','${orderCost}','${cardType}','${orderNum}','${rechargeId}' FROM DUAL 
      WHERE (select balance from t_recharge where recharge_id='${rechargeId}' and deadline>=NOW()) >=${orderCost};`
          // 更新会员卡余额
          sql2 += ` UPDATE t_recharge SET balance=balance-${orderCost} WHERE recharge_id = '${rechargeId}' ;`;
          // 更新用户表余额（可以有多张储值卡）
          sql2 += `UPDATE t_user AS A SET balance=(SELECT SUM(balance) FROM t_recharge AS B 
      WHERE A.user_id=B.user_id AND B.user_id='${userId}' AND B.recharge_type=1 AND B.deadline>=NOW())`;
        } else if (cardType == 2 && seat_type == 0) { //包时卡：在有效期内且只能订单人座
          sql2 = `INSERT INTO t_order(user_id,shop_id,sid,order_date,start_time,end_time,pay_type,order_num,pid) 
      SELECT '${userId}','${shopId}','${sid}','${dateVal}','${startVal}','${endVal}','${cardType}','${orderNum}','${rechargeId}' FROM DUAL 
      WHERE (select deadline from t_recharge where recharge_id='${rechargeId}' )>=NOW();`;
        } else {
          res.send({ error_code: 1, message: '订座失败' })
          return;
        }
        pool.query(sql2, (err, result) => {
          if (err) throw err;
          // console.log(result)
          if (cardType == 1 && result[0].affectedRows > 0) {
            res.send({ success_code: 200, message: '储值卡订座成功' })
          }else if(cardType == 2 && result.affectedRows > 0){
            res.send({ success_code: 200, message: '包时卡订座成功' })
          }else {
            res.send({ error_code: 1, message: '订座失败' })
          }
        })
      })
    } else {
      res.send({ error_code: 1, message: '同一用户同一时段仅可预定一个座位' })
    }
  })
})

// 获取距离最近的可用订座信息
router.post('/getOrderLatest', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id, A.order_status,A.pid,B.shop_name,C.seat_id,C.seat_type,C.seat_info,A.order_date,A.start_time,A.end_time from t_order A';
    sql += ' LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid';
    sql += ' WHERE A.user_id = ? AND A.order_status IN(?,?) LIMIT 1;';
    pool.query(sql, [userId, 0, 1], (err, result) => {
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
router.post('/getOrderAll', (req, res) => {
  let userId = req.body.userId;
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_status,B.shop_name,C.seat_id,C.seat_type,C.seat_info,A.order_date,A.start_time,A.end_time from t_order A';
    sql += ' LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid';
    sql += ' WHERE A.user_id = ? AND A.order_status IN(?,?) ORDER BY A.pay_time DESC;';
    pool.query(sql, [userId, 0, 1], (err, result) => {
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
router.post('/getOrderDetails', (req, res) => {
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
router.post('/cancelOrder', (req, res) => {
  let { userId, orderId, rechargeId } = req.body;
  let sql='SELECT pay_type FROM t_order WHERE user_id = ? AND order_id=? AND order_status=?';
  pool.query(sql,[userId,orderId,0],(err,result)=>{
    if (err) throw err;
    if (result[0]) {
      if (result[0].pay_type == 1) {
        sql = 'UPDATE t_order SET order_status=?,order_refund=order_cost,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        sql += 'UPDATE t_recharge SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE recharge_id =?;';
        sql += 'UPDATE t_user SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE user_id = ?;';
        pool.query(sql, [3, userId, orderId, orderId, rechargeId, orderId, userId], (err, result) => {
          if (err) throw err;
          // console.log(result)
          if (result[0].affectedRows > 0) {
            res.send({ success_code: 200, message: '取消订座执行完毕' });
          }
        })
      } else if (result[0].pay_type == 2) {
        sql = 'UPDATE t_order SET order_status=?,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        pool.query(sql, [3, userId, orderId], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send({ success_code: 200, message: '取消订座执行完毕' });
          }
        })
      }
    } else {
      res.send({ error_code:1, message: '查询失败' });
    }
  })
})

// 开始订单
router.post('/startOrder', (req, res) => {
  let { userId, orderId } = req.body;
  let sql = 'UPDATE t_order SET order_status=? WHERE user_id = ? AND order_id=? AND order_status=?;';
  pool.query(sql, [1, userId, orderId,0], (err, result) => {
    if (err) throw err;
    // console.log(result)
    if (result.affectedRows > 0) {
      res.send({ success_code: 200, message: '订单已开始' });
    }
  })
})

// 结束订单
router.post('/endOrder', (req, res) => {
  let { userId, orderId, rechargeId } = req.body;
  let timeBefore, timeNow, distance, refund, unit = 1000 * 60 * 30;
  let sql = 'SELECT pay_type FROM t_order WHERE user_id = ? AND order_id=? AND order_status=?;';
  pool.query(sql, [userId, orderId,1], (err, result) => {
    if (err) throw err;
    if (result[0]){
      if (result[0].pay_type == 1) {
        // 获得当天已完结的订单时长
        sql = 'SELECT SUM(UNIX_TIMESTAMP(status_change_time)*1000-start_time) AS time FROM t_order WHERE order_status=? AND user_id=? AND order_date=date(NOW());';
        sql += 'SELECT A.sid,A.seat_type,A.seat_price FROM t_shop_seat A,t_order B WHERE A.sid=B.sid AND B.order_id=?;'
        pool.query(sql, [2, userId, orderId], (err, result) => {
          if (err) throw err;
          let { sid, seat_type, seat_price } = result[1][0];
          timeBefore = Math.ceil(result[0][0].time / unit);
          if (timeBefore < 12) { // 还没有达到封顶时长，需要计算应返还的费用  4.5：单人座半小时费用  10：双人座半小时费用
            sql = "SELECT (REPLACE(unix_timestamp(current_timestamp(3)),'.','')-start_time) AS time,order_cost FROM t_order where user_id=? AND order_id =?";
            pool.query(sql, [userId, orderId], (err, result) => {
              if (err) throw err;
              timeNow = Math.ceil(result[0].time / unit);
              distance = 12 - timeBefore; // 离封顶时长的距离
              if (timeNow >= distance) { // 到达封顶时长，应付distance*seat_price，返还=已付-应付
                refund = result[0].order_cost - distance * seat_price * 0.5
              } else { // 未到达封顶时长
                refund = result[0].order_cost - timeNow * seat_price * 0.5
              }
              sql = 'UPDATE t_order SET order_status=?,order_refund=?,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
              sql += 'UPDATE t_recharge SET balance=balance+? WHERE recharge_id =?;';
              sql += 'UPDATE t_user SET balance=balance+? WHERE user_id = ?;';
              pool.query(sql, [2, refund, userId, orderId, refund, rechargeId, refund, userId], (err, result) => {
                if (err) throw err;
                if (result[0].affectedRows > 0) {
                  res.send({ success_code: 200, message: '结束订座执行完毕' });
                }
              })
            })
          } else { // 已经达到封顶时长，退还订座费用
            sql = 'UPDATE t_order SET order_status=?,order_refund=order_cost,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
            sql += 'UPDATE t_recharge SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE recharge_id =?;';
            sql += 'UPDATE t_user SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE user_id = ?;';
            pool.query(sql, [2, userId, orderId, orderId, rechargeId, orderId, userId], (err, result) => {
              if (err) throw err;
              if (result[0].affectedRows > 0) {
                res.send({ success_code: 200, message: '结束订座执行完毕' });
              }
            })
          }
        })
      } else if (result[0].pay_type == 2) {
        sql = 'UPDATE t_order SET order_status=?,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        pool.query(sql, [2, userId, orderId], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send({ success_code: 200, message: '结束订座执行完毕' });
          }
        })
      } 
    }else {
      res.send({ error_code: 1, message: '查询失败' });
    }
  })  
})

// 订单逾期 
router.post('/overOrder', (req, res) => {
  let { userId, orderId, rechargeId } = req.body;
  let sql = 'SELECT pay_type FROM t_order WHERE user_id = ? AND order_id=? AND order_status=?';
  pool.query(sql, [userId, orderId,0], (err, result) => {
    if (err) throw err;
    if (result[0]) {
      if (result[0].pay_type == 1) {
        sql = 'UPDATE t_order SET order_status=?,order_refund=order_cost*0.7,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        sql += 'UPDATE t_recharge SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE recharge_id =?;';
        sql += 'UPDATE t_user SET balance=balance+(SELECT order_refund from t_order WHERE order_id=?) WHERE user_id = ?;';
        pool.query(sql, [4, userId, orderId, orderId, rechargeId, orderId, userId], (err, result) => {
          if (err) throw err;
          // console.log(result)
          if (result[0].affectedRows > 0) {
            res.send({ success_code: 200, message: '订单逾期，座位已释放' });
          }
        })
      } else if (result[0].pay_type == 2) {
        sql = 'UPDATE t_order SET order_status=?,status_change_time=NOW() WHERE user_id = ? AND order_id=?;';
        pool.query(sql, [4, userId, orderId], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send({ success_code: 200, message: '订单逾期，座位已释放' });
          }
        })
      }
    }else {
      res.send({ error_code:1, message: '查询失败' });
    }
  })
})

// 获取所有订座记录
router.post('/getMyDataAll', (req, res) => {
  // let userId = req.body.userId;
  let { userId, pno, pageSize } = req.body;
  if (!pno) { pno = 1 };
  if (!pageSize) { pageSize = 5 };
  let offset = (pno - 1) * pageSize;
  let ps = parseInt(pageSize); 
  if (userId) {
    // 订单编号，店铺名，座位信息，下单时间，支付方式
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? ORDER BY A.pay_time DESC LIMIT ?,?;';
    pool.query(sql, [userId, offset, ps], (err, result) => {
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
router.post('/getMyDataDelay', (req, res) => {
  // let userId = req.body.userId;
  let { userId, pno, pageSize } = req.body;
  if (!pno) { pno = 1 };
  if (!pageSize) { pageSize = 5 };
  let offset = (pno - 1) * pageSize;
  let ps = parseInt(pageSize); 
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.is_delay=? ORDER BY A.pay_time DESC LIMIT ?,?;';
    pool.query(sql, [userId, 1,offset,ps], (err, result) => {
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
router.post('/getMyDataCancel', (req, res) => {
  // let userId = req.body.userId;
  let { userId, pno, pageSize } = req.body;
  if (!pno) { pno = 1 };
  if (!pageSize) { pageSize = 5 };
  let offset = (pno - 1) * pageSize;
  let ps = parseInt(pageSize); 
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=? ORDER BY A.pay_time DESC LIMIT ?,?;';
    pool.query(sql, [userId, 3,offset,ps], (err, result) => {
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
router.post('/getMyDataEnd', (req, res) => {
  // let userId = req.body.userId;
  let { userId, pno, pageSize } = req.body;
  if (!pno) { pno = 1 };
  if (!pageSize) { pageSize = 5 };
  let offset = (pno - 1) * pageSize;
  let ps = parseInt(pageSize); 
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=? ORDER BY A.pay_time DESC LIMIT ?,?;';
    pool.query(sql, [userId, 2,offset,ps], (err, result) => {
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
router.post('/getMyDataOverdue', (req, res) => {
  // let userId = req.body.userId;
  let { userId, pno, pageSize } = req.body;
  if (!pno) { pno = 1 };
  if (!pageSize) { pageSize = 5 };
  let offset = (pno - 1) * pageSize;
  let ps = parseInt(pageSize); 
  if (userId) {
    let sql = 'SELECT A.order_id,A.order_date,A.start_time,A.end_time,A.pay_time,A.pay_type,B.shop_name,';
    sql += ' C.seat_id,C.seat_type,C.seat_info FROM t_order A LEFT JOIN t_shop B on A.shop_id=B.shop_id';
    sql += ' LEFT JOIN t_shop_seat C on A.sid=C.sid WHERE A.user_id = ? AND A.order_status=? ORDER BY A.pay_time DESC LIMIT ?,?;';
    pool.query(sql, [userId, 4,offset,ps], (err, result) => {
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
router.post('/getPurchaseDetails', (req, res) => {
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

//获取手机验证码
router.post('/getPhoneCode', (req, res) => {
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
router.post('/phoneLogin', (req, res) => {
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
router.post('/pwdLogin', (req, res) => {
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

// 修改手机号
router.post('/updatePhone',(req, res) =>{
  let {userId,phone, phoneCode}=req.body;
  if(user[phone] === phoneCode){
    let sql='UPDATE t_user SET phone=? WHERE user_id=?';
    pool.query(sql,[phone,userId],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({success_code:200,message:'手机号修改成功'});
      }else{
        res.send({error_code:1,message:'手机号修改失败'});
      }
    })
  }else{
    res.send({error_code:1,message:'验证码错误'});
  }
})

// 修改用户资料（头像和用户名）
router.post('/updateUserInfo',(req,res)=>{
  let { userId, userName, avatar } = req.body;
  if (avatar) {
    let sql = 'UPDATE t_user SET user_name=?,avatar=? WHERE user_id=?';
    pool.query(sql, [userName, 'http://182.92.118.167:3001'+avatar, userId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ success_code: 200, message: '修改成功' });
      } else {
        res.send({ error_code: 1, message: '修改失败' });
      }
    })
  } else {
    let sql = 'UPDATE t_user SET user_name=? WHERE user_id=?';
    pool.query(sql, [userName, userId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ success_code: 200, message: '修改成功' });
      } else {
        res.send({ error_code: 1, message: '修改失败' });
      }
    })
  }
  
});

let datatime = './public/img/avatar/';
//将图片放到服务器
let storage = multer.diskStorage({
  // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
  destination: datatime,
  // //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    cb(null, new Date().getTime()+'.jpg');
  }
});
let upload = multer({
  storage: storage
});
// let upload = multer({dest:'./public/img/avatar'}).any();
router.post('/upLoadImg',upload.any(),(req,res) =>{
  if(req.files[0]){
    res.send({success_code:200,data:req.files});
    // console.log(req.files);
  }
});

// 退出登录
router.get("/logout", (req, res) => {
  req.session.userId = null;
  res.clearCookie('user_id');
  res.send({ success_code: 200, message: "已退出" });
});

module.exports = router;