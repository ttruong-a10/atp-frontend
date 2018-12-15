import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
/* eslint-disable */ 

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    authenticated: false,
    authToken: '',
    courses: null,
  },

  mutations: {
    login(state, payload) {
        state.authenticated = true
        state.authToken = payload.token
    },
    logout(state) {
        state.authenticated = false 
        state.authToken = ''
    },
    updateCourses(state) {
      axios.get('/courses/').then( response => {
          state.courses = response.data
        })
        .catch( error => {
          console.log(error.response)
        })
    }
  },

  actions: {
    updateCourses(context) {
      context.commit('updateCourses')
    }
  }
})
