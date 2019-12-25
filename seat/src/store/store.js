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
    token: null,
    userInfo: {},
    // orders: {
    //   shop_id:null,
    //   shop_name: null,
    //   seat_id: null,
    //   seat_count: 0,
    //   seat_type: 0,
    //   order_date: null,
    //   start_time: null,
    //   end_time: null,
    //   duration: 0
    // }
  },
  mutations: { // 同步修改state
    [types.UPDATE_LOGIN](state, payload) {
      state.isLogin = payload;
    },
    [types.UPDATE_TOKEN](state, payload) {
      state.token = payload;
    },
    [types.UPDATE_USER_INFO](state, payload) {
      state.userInfo = payload;
    },
    [types.LOGIN]: (state,payload) => {
      state.isLogin = true;
      state.userInfo = payload.data;
      // state.token = payload.sessionToken;
      state.token = '123';
    },
    [types.LOGOUT]: (state) => {
      state.isLogin = false;
      state.userInfo = {};
      state.token = null;
    },
  },
  getters: {
    isLogin: state => state.isLogin,
    token: state => state.token,
    userInfo: state => state.userInfo,
  },
  actions: { // 异步修改state
  },
  modules: {
  }
})