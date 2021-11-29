import { showAlert } from '~/utils/showAlert'

export const actions = {
  async getDashboard({ commit }, payload) {
    try {
      await this.$axios.get('/')

      showAlert(commit, 'Success!', 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
