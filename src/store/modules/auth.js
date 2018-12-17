const state = {
  authenticated: false,
  token: '',
}

const getters = { 
  authenticated(state) {
    return state.authenticated
  },
  token(state) {
    return state.token
  },
}

const mutations = {
  'LOGIN'(state, payload) {
    state.authenticated = true
    state.token = payload.token
  },
  'LOGOUT'(state) {
    state.authenticated = false 
    state.token = ''
  },
}

const actions = { } 


export default {
  state,
  getters,
  mutations,
  actions
}
