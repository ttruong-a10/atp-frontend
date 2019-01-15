import Vue from 'vue'
import axios from 'axios'

const state = {
  pods: [],
  podSelection: {},
  podTable: {},
}

const getters = {
  pods(state) {
    return state.pods
  },
  podSelection(state) {
    return state.podSelection
  },
  podTable(state) {
    return state.podTable
  },
}

const mutations = {
  'UPDATE_PODS'(state, payload) {
    state.pods = payload
  },

  'SELECT_PODS'(state, payload) {
    state.podselection = payload 
  },

  'DELETE_POD'(state, payload) {
    // Find the object with id in array
    const index = state.pods.findIndex(x => x.id == payload.id)

    // Must use Vue.delete to be reactive
    Vue.delete(state.pods, index) 
  },

  'UPDATE_TABLE'(state, payload) {
    state.podTable = payload
  },
}

const actions = {
  async getPodsInCourse({ commit, state }, courseId) {
    try {
      const response = await axios.get(`/courses/${courseId}/`)
      commit('UPDATE_PODS', response.data)
      return state.pods
    }
    catch (error) {
      throw(error.response)
    }
  },

  async checkPodExist({ dispatch }, podName) {
    const pods = await dispatch('getPods')

    if (pods.filter(pod => pod.name === podName).length > 0) {
      return true
    } else {
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}