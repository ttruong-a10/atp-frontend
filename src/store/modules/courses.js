import Vue from 'vue'
import axios from 'axios'

const state = {
  courses: [],
  courseSelection: {},
  courseTable: {},
  loading: {},
}

const getters = {
  courses(state) {
    return state.courses
  },
  courseSelection(state) {
    return state.courseSelection
  },
  courseTable(state) {
    return state.courseTable
  },
  loading(state) {
    return state.loading
  }
}

const mutations = {
  'UPDATE_COURSES'(state, payload) {
    state.courses = payload
  },

  'SELECT_COURSES'(state, payload) {
    state.courseSelection = payload 
  },

  'DELETE_COURSE'(state, payload) {
    // Find the object with id in array
    const index = state.courses.findIndex(x => x.id == payload.id)

    // Must use Vue.delete to be reactive
    Vue.delete(state.courses, index) 
  },

  'UPDATE_TABLE'(state, payload) {
    state.courseTable = payload
  },
  
  'UPDATE_LOADING'(state, payload) {
    const key = payload.el
    const value = payload.status
    Vue.set(state.loading, key, value)
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

  async checkCourseExist({ dispatch }, courseName) {
    const courses = await dispatch('getCourses')

    if (courses.filter(course => course.name === courseName).length > 0) {
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