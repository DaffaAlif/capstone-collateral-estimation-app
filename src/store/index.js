import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    currentUser(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },

    LOGOUT(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    // Simulated login action. Replace this with an actual API call.
    login({ commit }, credentials) {
      // Example API call simulation:
      // return axios.post('/api/login', credentials).then(response => {
      //   commit('SET_USER', response.data.user)
      //   commit('SET_TOKEN', response.data.token)
      // })
      return axios.post('http://localhost:5000/api/v1/auth/login', credentials).then(response => {
        commit('SET_USER', response.data.data)
        commit('SET_TOKEN', response.data.data.token)
      }).catch(error => {
        throw error
      })
    },

    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  modules: {
    // Add additional modules if needed
  }
})
