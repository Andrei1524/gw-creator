import { showAlert } from '~/utils/showAlert'

export const actions = {
  async createGiveaway({ commit }, payload) {
    try {
      return await this.$axios.post('/giveaways/create_giveaway', {
        ...payload
      })
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },

  async getGiveaways({ commit }, payload) {
    try {
      const response = await this.$axios.get(`/giveaways${payload}`)
      return response.data
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
