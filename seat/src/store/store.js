import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 使用vuex-persistedstate插件对vuex的状态持久化:将store里的状态存到localStorage
  plugins: [createPersistedstate()],
  state: {
    isLogin: false,
    user_id: '',
    token: '',
    jsonData:{}
  },
  mutations: {
    [types.updateLogin](state, payload) {
      state.isLogin = payload;
    },
    [types.updateUserId](state, payload) {
      state.user_id = payload;
    },
    [types.updateToken](state, payload) {
      state.token = payload;
    },
    [types.updateJsonData](state, payload) {
      state.jsonData = payload;
    },
  },
  getters: {
    isLogin: state => state.isLogin,
    user_id: state => state.user_id,
    token: state => state.token,
    jsonData: state => state.jsonData,
  },
  actions: {
  },
  modules: {
  }
})