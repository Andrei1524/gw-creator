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
  },

  async register({ commit }, payload) {
    try {
      await this.$axios.post('/auth/register', {
        ...payload
      })
      await this.$router.replace('/')

      showAlert(commit, 'Success!', 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
