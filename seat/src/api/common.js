// 时分不足两位补0
export const checkTime = (i) => {
  if (i < 10) { i = "0" + i }
  return i
};
// 把字符串value解析为单位为毫秒的时间
export const parseTime = (value) => {
  let dateStr = formatDate(new Date(), "yyyy/MM/dd");
  // let dateStr = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();
  let time = new Date(dateStr + " " + value).getTime();
  return time;
};
// 格式化单位为毫秒的时间，返回 hh:mm 格式的字符串
export const formatTime = (value) => {
  return checkTime(value.getHours()) + ':' + checkTime(value.getMinutes())
};
// 格式化日期
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};