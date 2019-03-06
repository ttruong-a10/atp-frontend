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
    state.podSelection = payload 
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
  async getPods({ commit, state }, courseSlug) {
    try {
      const response = await axios.get(`/courses/${courseSlug}/pods/`)
      commit('UPDATE_PODS', response.data)
      return state.pods
    }
    catch (error) {
      throw(error.response)
    }
  },

  async deletePod({ commit, state }, podSlug) {
    try {
      await axios.delete(`/pods/${podSlug}/`)
      commit('DELETE_COURSE', podSlug)
      return state.pods
    }
    catch (error) {
      throw(error.response)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}