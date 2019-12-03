// 使用常量替代 Mutation 事件类型
// 可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个app包含的 mutation 一目了然

export const updateLogin = 'updateLogin'
export const updateUserId = 'updateUserId'
export const updateToken = 'updateToken'
export const updateJsonData = 'updateJsonData'