import { showAlert } from '~/utils/showAlert'

export const actions = {
  async login({ commit }, payload) {
    try {
      await this.$auth.loginWith('local', { data: payload })
      await this.$router.replace('/')

      showAlert(commit, 'Success!', 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
  setAccessToken(state, token) {
    state.access_token = token
  }
}
