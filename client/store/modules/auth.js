export const state = () => ({
})

export const actions = {
  async login({ commit }, payload) {
    try {
      const response = await this.$auth.loginWith('local', { data: this.form })

      commit('setAccessToken', response.data.access_token)
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
