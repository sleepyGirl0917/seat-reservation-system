import ajax from './ajax'

//获取验证码
export const getPhoneCode = (phone) => ajax('/api/getPhoneCode', { phone }, 'POST');
//手机登录
export const phoneLogin = (phone, phoneCode) => ajax('/api/phoneLogin', { phone, phoneCode }, 'POST');
//账号密码登录
export const pwdLogin = (userName, password, captcha) => ajax('/api/pwdLogin', { userName, password, captcha }, 'POST');
//获取用户信息
export const getUserInfo = (userId) => ajax('/api/getUserInfo', { userId });
//更新用户头像
export const updateUserAvatar = (userId, avatar) => ajax('/api/updateUserAvatar', { userId, avatar }, 'POST');
//更新用户名
export const updateUserName = (userId, userName) => ajax('/api/updateUserName', { userId, userName }, 'POST');
//更新用户信息
export const updateUserInfo = (userId, userName, avatar, password, sex, sign, birthday) => ajax('/api/updateUserInfo', { userId, userName, avatar, password, sex, sign, birthday }, 'POST');
//更新座位信息
export const updateScheduleSeat = (scheduleId, seatInfo) => ajax('/api/updateScheduleSeat', { scheduleId, seatInfo }, 'POST');