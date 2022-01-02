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
      return await this.$axios.get(`/giveaways${payload}`)
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },

  async getGiveaway({ commit }, generatedId) {
    try {
      const response = await this.$axios.get(`/giveaways/${generatedId}`)
      return response.data
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  }
}

export const mutations = {
}
