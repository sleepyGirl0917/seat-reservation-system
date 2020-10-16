import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    LOGIN(state, token) {
      state.UserToken = token
    },
    LOGIN_OUT(state) {
      state.UserToken = ''
    }
  },
  actions: {},
  modules: {}
})
