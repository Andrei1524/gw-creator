export const actions = {
  async login({ commit }, payload) {
    try {
      await this.$auth.loginWith('local', { data: payload })
      await this.$router.replace('/')
    } catch (err) {
      commit('modules/alert/setShowDismissibleAlert', {
        value: true,
        message: err
      }, {root: true})
    }
  }
}

export const mutations = {
  setAccessToken(state, token) {
    state.access_token = token
  }
}
