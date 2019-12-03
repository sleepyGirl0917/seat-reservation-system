import Vue from 'vue'
import Vuex from 'vuex'
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
    updateLogin(state, payload) {
      state.isLogin = payload;
      state.token = 'login'
    },
    updateUserId(state, payload) {
      state.user_id = payload;
    },
    updateToken(state, payload) {
      state.token = payload;
    },
    updateJsonData(state, payload) {
      state.jsonData = payload;
    },
    /* updateLogout(state){
      // localStorage.clear();
      state.user_id=null
      state.jsonData = null
      state.token = null
      state.isLogin=false
    }, */
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