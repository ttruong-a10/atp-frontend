import Vue from 'vue'
import axios from 'axios'

const state = {
  courses: [],
  courseSelection: {},
  courseTable: {},
}

const getters = {
}

const mutations = {
  'UPDATE_COURSES'(state, payload) {
    state.courses = payload
  },

  'SELECT_COURSES'(state, payload) {
    state.courseSelection = payload 
  },

  'DELETE_COURSE'(state, courseId) {
    // Find the object with id in array
    const index = state.courses.findIndex(x => x.id == courseId)

    // Must use Vue.delete to be reactive
    Vue.delete(state.courses, index) 
  },

  'UPDATE_TABLE'(state, payload) {
    state.courseTable = payload
  },
  
}

const actions = {
  async getCourses({ commit, state }) {
    try {
      const response = await axios.get('/courses/')
      commit('UPDATE_COURSES', response.data)
      return state.courses
    }
    catch (error) {
      throw(error.response)
    }
  },

  async deleteCourse({ commit, state }, courseId) {
    try {
      await axios.delete(`/courses/${courseId}/`)
      commit('DELETE_COURSE', courseId)
      return state.courses
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