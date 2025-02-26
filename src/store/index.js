import axios from 'axios'
import { createStore } from 'vuex'
import { fetchToken, postLogin } from '../api/api'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  },
  getters: {
    isAuthenticated(state) {
      // Check if the token valid
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
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      console.log(localStorage.getItem('token'))
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
      return postLogin(credentials).then(response => {
        commit('SET_USER', response.data.data)
        commit('SET_TOKEN', response.data.data.token)
      }).catch(error => {
        throw error
      })
    },

    logout({ commit }) {
      commit('LOGOUT')

    },
    async checkAuth({ commit, state }) {
      if (!state.token) {
        commit('LOGOUT')
        return false
      }
  
      try {
        const response = await fetchToken();
        commit('SET_USER', response.data.data) // Update user info if valid
        return true
      } catch (error) {
        console.error('Token invalid:', error)
        commit('LOGOUT') // If the token is invalid, log the user out
        return false
      }
    },
  },
  
  modules: {
    // Add additional modules if needed
  }
})
