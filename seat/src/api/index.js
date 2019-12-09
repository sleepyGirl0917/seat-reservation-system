import ajax from './ajax'

//获取验证码
export const getPhoneCode = (phone) => ajax('/api/getPhoneCode', { phone }, 'POST')
//手机登录
export const phoneLogin = (phone, phoneCode) => ajax('/api/phoneLogin', { phone, phoneCode }, 'POST')
//账号密码登录
export const pwdLogin = (userName, password, captcha) => ajax('/api/pwdLogin', { userName, password, captcha }, 'POST')
//获取用户信息
export const getUserInfo = (userId) => ajax('/api/getUserInfo', { userId }, 'POST')
//获取当天订座信息
export const getOrderLatest = (userId) => ajax('/api/getOrderLatest', { userId }, 'POST')
//获取所有订座信息
export const getOrderAll = (userId) => ajax('/api/getOrderAll', { userId }, 'POST')
// 获取订单详情
export const getOrderDetails = (userId, orderId) => ajax('/api/getOrderDetails', { userId, orderId }, 'POST')
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
//更新用户头像
export const updateUserAvatar = (userId, avatar) => ajax('/api/updateUserAvatar', { userId, avatar }, 'POST')
//更新用户名
export const updateUserName = (userId, userName) => ajax('/api/updateUserName', { userId, userName }, 'POST')
//更新座位信息
export const updateScheduleSeat = (seatId, seatInfo) => ajax('/api/updateScheduleSeat', { seatId, seatInfo }, 'POST');
// 退出登录
export const logout = () => ajax('/api/logout');