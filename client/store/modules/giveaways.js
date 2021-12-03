import { showAlert } from '~/utils/showAlert'

export const actions = {
  async createGiveaway({ commit }, payload) {
    try {
      return await this.$axios.post('/create_giveaway', {
        ...payload
      })
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
