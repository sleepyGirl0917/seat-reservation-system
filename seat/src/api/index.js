import ajax from './ajax'

// 获取验证码
export const getPhoneCode = (phone) => ajax('/api/getPhoneCode', { phone }, 'POST')
// 手机登录
export const phoneLogin = (phone, phoneCode) => ajax('/api/phoneLogin', { phone, phoneCode }, 'POST')
// 账号密码登录
export const pwdLogin = (userName, password, captcha) => ajax('/api/pwdLogin', { userName, password, captcha }, 'POST')
// 修改手机号
export const updatePhone=(userId,phone, phoneCode)=>ajax('/api/updatePhone',{userId,phone, phoneCode},'POST')
// 修改用户头像
export const updateUserAvatar = (userId,avatar)=>ajax('/api/updateUserAvatar',{userId,avatar},'POST');
// 上传图片到服务器
export const upLoadImg = (formData)=>ajax('/api/admin/upLoadImg',formData,'POST');
// 修改用户名
export const updateUserName = (userId,userName)=>ajax('/api/updateUserName',{userId,userName},'POST');
// 获取用户信息
export const getUserInfo = (userId) => ajax('/api/getUserInfo', { userId }, 'POST')
// 获取当天订座信息
export const getOrderLatest = (userId) => ajax('/api/getOrderLatest', { userId }, 'POST')
// 获取所有订座信息
export const getOrderAll = (userId) => ajax('/api/getOrderAll', { userId }, 'POST')
// 获取订单详情
export const getOrderDetails = (userId, orderId) => ajax('/api/getOrderDetails', { userId, orderId }, 'POST')
// 取消订单
export const cancelOrder = (userId, orderId, rechargeId) => ajax('/api/cancelOrder', { userId, orderId, rechargeId }, 'POST')
// 开始订单
export const startOrder = (userId, orderId) => ajax('/api/startOrder', { userId, orderId}, 'POST')
// 结束订单
export const endOrder = (userId, orderId, rechargeId) => ajax('/api/endOrder', { userId, orderId, rechargeId }, 'POST')
// 订单逾期
export const overOrder = (userId, orderId, rechargeId) => ajax('/api/overOrder', { userId, orderId, rechargeId},'POST')
// 获取所有订座记录
export const getMyDataAll = (userId) => ajax('/api/getMyDataAll', { userId }, 'POST')
// 获取延长时段记录
export const getMyDataDelay = (userId) => ajax('/api/getMyDataDelay', { userId }, 'POST')
// 获取取消订单记录
export const getMyDataCancel = (userId) => ajax('/api/getMyDataCancel', { userId }, 'POST')
// 获取完成订单记录
export const getMyDataEnd = (userId) => ajax('/api/getMyDataEnd', { userId }, 'POST')
// 获取逾期订单记录
export const getMyDataOverdue = (userId) => ajax('/api/getMyDataOverdue', { userId }, 'POST')
// 获取消费记录
export const getPurchaseDetails = (userId, orderId) => ajax('/api/getPurchaseDetails', { userId, orderId }, 'POST')
// 更新座位信息
export const updateScheduleSeat = (seatId, seatInfo) => ajax('/api/updateScheduleSeat', { seatId, seatInfo }, 'POST')
// 退出登录
export const logout = () => ajax('/api/logout')
// 加载店铺信息
export const getShopInfo = () => ajax('/api/getShopInfo')
// 获取已被预定的座位
export const getSeatSoldInfo = (shopId, dateVal,startVal, endVal) => ajax('/api/getSeatSoldInfo', { shopId, dateVal,startVal, endVal }, 'POST')
// 获取座位被预定的时段详情
export const getSeatSoldDetail = (shopId, dateVal, seatId) => ajax('/api/getSeatSoldDetail', { shopId, dateVal, seatId }, 'POST')
// 获取用户会员卡信息
export const getVipInfo = (userId) => ajax('/api/getVipInfo', { userId }, 'POST')
// 预定座位
export const orderSeat = (userId, shopId, seatId, dateVal, startVal, endVal, cardType, rechargeId) => ajax('/api/orderSeat', { userId, shopId, seatId, dateVal, startVal, endVal, cardType, rechargeId }, 'POST')
// 获取会员活动方案
export const getPlan = () => ajax('/api/getPlan')
// 加入会员
export const joinMember = (userId, planId) => ajax('/api/joinMember', { userId, planId },'POST')