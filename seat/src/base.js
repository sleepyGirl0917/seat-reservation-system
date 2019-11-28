// 全局方法
exports.install=function (Vue, options){
  Vue.prototype.alert = () => { console.log(123)};
}

