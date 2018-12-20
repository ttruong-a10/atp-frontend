import { Loading } from 'element-ui';

const state = { 
    loading: null,
}

const getters = { }

const mutations = {
  'START_LOADING'(state) {
    state.loading = Loading.service({ fullscreen: true })
  },
  'STOP_LOADING'(state) {
    state.loading.close()
  },
  
}

const actions = { } 

export default {
  state,
  getters,
  mutations,
  actions
}
