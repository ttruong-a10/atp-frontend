import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import auth from './modules/auth'
import courses from './modules/courses'
import pods from './modules/pods'
import loading from './modules/loading'

/* eslint-disable */ 

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage, // or window.sessionStorage or localForage instance.
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({auth: state.auth}),
  filter: mutations => ({auth: mutations.auth})
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    loading,
    auth,
    courses,
    pods,
  },
})
