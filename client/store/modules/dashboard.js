import { showAlert } from '~/utils/showAlert'

export const actions = {
  async getDashboard({ commit }, payload) {
    try {
      return await this.$axios.get('/dashboard')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
