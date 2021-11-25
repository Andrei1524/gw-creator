export const state = () => ({
  user: null,
  access_token: null,
  loggedIn: false
})

export const getters = {
  isLoggedIn(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  }
}

export const actions = {
  async login({ commit }, payload) {
    try {
      const response = await this.$axios.post('/login', {
        ...payload
      })

      commit('setAccessToken', response.data.access_token)
    } catch (err) {
      console.log(err)
    }
  }
}

export const mutations = {
  setAccessToken(state, token) {
    state.access_token = token
  }
}
