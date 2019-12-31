import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
// import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 使用vuex-persistedstate插件对vuex的状态持久化:将store里的状态存到localStorage
  // plugins: [createPersistedstate()],
  state: {
    token: localStorage.getItem('token'),
    uid: localStorage.getItem('uid'),
  },
  mutations: { // 同步修改state
    [types.UPDATE_TOKEN]: (state, payload) => {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    [types.UPDATE_USER]: (state, payload) => {
      state.uid = payload;
      localStorage.setItem('uid', payload);
    },
    [types.LOGIN]: (state, payload) => {
      state.uid = payload.user_id;
      localStorage.setItem('uid', payload.user_id);
      state.token = '123';
      localStorage.setItem('token', '123');
      // state.token = payload.sessionToken;
      // localStorage.setItem('token', payload.sessionToken);
    },
    [types.LOGOUT]: (state) => {
      state.uid = null;
      state.token = null;
      localStorage.clear();
    },
  },
  getters: {
    token: state => state.token,
    uid: state => state.uid,
  },
  actions: { // 异步修改state
  },
  modules: {
  }
})