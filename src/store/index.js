import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null
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
    },
    SET_TOKEN(state, token) {
      state.token = token
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
      
      // Dummy data for simulation
      const dummyUser = { id: 1, name: 'John Doe' }
      const dummyToken = 'abcdef123456'
      commit('SET_USER', dummyUser)
      commit('SET_TOKEN', dummyToken)
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  modules: {
    // Add additional modules if needed
  }
})
