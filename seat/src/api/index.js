import ajax from './ajax'

// 获取验证码
export const getPhoneCode = (phone) => ajax('/getPhoneCode', { phone }, 'POST')
// 手机登录
export const phoneLogin = (phone, phoneCode) => ajax('/phoneLogin', { phone, phoneCode }, 'POST')
// 账号密码登录
export const pwdLogin = (userName, password, captcha) => ajax('/pwdLogin', { userName, password, captcha }, 'POST')
// 退出登录
export const logout = () => ajax('/logout')
// 修改手机号
export const updatePhone=(userId,phone, phoneCode)=>ajax('/updatePhone',{userId,phone, phoneCode},'POST')
// 上传图片到服务器
export const upLoadImg = (formData)=>ajax('/upLoadImg',formData,'POST');
// 修改用户资料（头像和用户名）
export const updateUserInfo = (userId,userName,avatar)=>ajax('/updateUserInfo',{userId,userName,avatar},'POST');
// 获取会员活动方案
export const getPlan = () => ajax('/getPlan')
// 加入会员
export const joinMember = (userId, planId) => ajax('/joinMember', { userId, planId },'POST')
// 获取用户信息
export const getUserInfo = (userId) => ajax('/getUserInfo', { userId }, 'POST')
// 获取用户会员卡信息
export const getVipInfo = (userId) => ajax('/getVipInfo', { userId }, 'POST')
// 获取用户办卡记录
export const getRechargeRecord = (userId) => ajax('/getRechargeRecord', { userId }, 'POST')
// 获取距离最近的可用订座信息
export const getOrderLatest = (userId) => ajax('/getOrderLatest', { userId }, 'POST')
// 获取所有订座信息
export const getOrderAll = (userId) => ajax('/getOrderAll', { userId}, 'POST')
// 获取订单详情
export const getOrderDetails = (userId, orderId) => ajax('/getOrderDetails', { userId, orderId }, 'POST')
// 取消订单
export const cancelOrder = (userId, orderId, rechargeId) => ajax('/cancelOrder', { userId, orderId, rechargeId }, 'POST')
// 开始订单
export const startOrder = (userId, orderId) => ajax('/startOrder', { userId, orderId}, 'POST')
// 结束订单
export const endOrder = (userId, orderId, rechargeId) => ajax('/endOrder', { userId, orderId, rechargeId }, 'POST')
// 订单逾期
export const overOrder = (userId, orderId, rechargeId) => ajax('/overOrder', { userId, orderId, rechargeId},'POST')
// 获取所有订座记录
export const getMyDataAll = (userId, pno, pageSize) => ajax('/getMyDataAll', { userId,pno, pageSize }, 'POST')
// 获取延长时段记录
export const getMyDataDelay = (userId, pno, pageSize) => ajax('/getMyDataDelay', { userId, pno, pageSize}, 'POST')
// 获取取消订单记录
export const getMyDataCancel = (userId, pno, pageSize) => ajax('/getMyDataCancel', { userId, pno, pageSize}, 'POST')
// 获取完成订单记录
export const getMyDataEnd = (userId, pno, pageSize) => ajax('/getMyDataEnd', { userId, pno, pageSize }, 'POST')
// 获取逾期订单记录
export const getMyDataOverdue = (userId, pno, pageSize) => ajax('/getMyDataOverdue', { userId, pno, pageSize }, 'POST')
// 获取消费记录
export const getPurchaseDetails = (userId, orderId) => ajax('/getPurchaseDetails', { userId, orderId }, 'POST')
// 加载店铺信息
export const getShopInfo = () => ajax('/getShopInfo')
// 获取已被预定的座位
export const getSeatSoldInfo = (shopId, dateVal,startVal, endVal) => ajax('/getSeatSoldInfo', { shopId, dateVal,startVal, endVal }, 'POST')
// 获取座位被预定的时段详情
export const getSeatSoldDetail = (shopId, dateVal, seatId) => ajax('/getSeatSoldDetail', { shopId, dateVal, seatId }, 'POST')
// 预定座位
export const orderSeat = (userId, shopId, seatId, dateVal, startVal, endVal, cardType, rechargeId) => ajax('/orderSeat', { userId, shopId, seatId, dateVal, startVal, endVal, cardType, rechargeId }, 'POST')

