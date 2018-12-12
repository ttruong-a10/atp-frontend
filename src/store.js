import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    authenticated: false,
    authToken: ''
  },

  mutations: {
    authenticate (state, payload) {
        state.authenticated = true
        state.authToken = payload.token
    }
  },

  actions: {

  }
})
