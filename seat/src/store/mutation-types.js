// 使用常量替代 Mutation 事件类型
// 可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个app包含的 mutation 一目了然

export const UPDATE_LOGIN = 'UPDATE_LOGIN'    // 更新state.isLogin
export const UPDATE_TOKEN = 'UPDATE_TOKEN'    // 更新state.token
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'    // 更新state.userInfo

export const LOGIN = 'LOGIN'    // 登录
export const LOGOUT = 'LOGOUT'  // 退出