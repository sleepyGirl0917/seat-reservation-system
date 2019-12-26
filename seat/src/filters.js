import Vue from 'vue'
// 创建日期过滤器
Vue.filter("dateTimeFilter", (val, type) => {
  // 创建日期对象
  let date = new Date(val);
  // console.log(date)
  if (date =='Invalid Date') return val
  // 获取年 月 日 时 分 秒
  let y = date.getFullYear();
  let m = date.getMonth() + 1;  // getMouth()的返回值从0开始，即0-11，所以需要+1
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  // 不满10补0
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  h < 10 && (h = "0" + h);
  min < 10 && (min = "0" + min);
  s < 10 && (s = "0" + s);
  // 返回字符串
  if (type == 'dateOnly') {
    return `${y}-${m}-${d}`;
  } else if (type == 'timeOnly') {
    return `${h}:${min}`;
  } else {
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  }
})

// 创建订单状态过滤器
Vue.filter("orderStatusFilter", (val) => {
  let start_time = new Date(val);
  let now_time = new Date();
  if (start_time > now_time) {
    return '未开始'
  } else {
    return '进行中'
  }
})

// 创建支付类型过滤器
Vue.filter("payTypeFilter", (val) => {
  switch (val) {
    case 0:
      return '体验卡';
    case 1:
      return '储值卡';
    case 2:
      return '包时卡';
  }
})

// 创建订单操作过滤器
Vue.filter("orderFilter", (val) => {
  switch (val) {
    case 'purchaseDetails-all':
      return '订座';
    case 'purchaseDetails-delay':
      return '延长时段';
    case 'purchaseDetails-cancel':
      return '取消订单';
    case 'purchaseDetails-end':
      return '结束';
    case 'purchaseDetails-overdue':
      return '逾期';
  }
})