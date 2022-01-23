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
  },

  async enrollInGiveaway({ commit }, generatedId) {
    try {
      const response = await this.$axios.post(`/giveaways/${generatedId}/enroll`)
      showAlert(commit, response.data, 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },

  async getGiveawayEnrolledUsers({ commit }, payload) {
    try {
      return await this.$axios.get(`/giveaways/${payload.generatedId}/enrolled_users${payload.computedQueries}`)
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },

  // TESTING FUNCTIONS
  async createTestGiveaway({ commit }, payload) {
    try {
      const response = await this.$axios.post('/giveaways/create_test_giveaway')
      showAlert(commit, response.data, 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },

  async resetRoulette({ commit }, generatedId) {
    try {
      const response = await this.$axios.post('/giveaways/reset_roulette', {
        generatedId
      })
      showAlert(commit, response.data, 'success')
    } catch (err) {
      showAlert(commit, err, 'warning')
    }
  },
}

export const mutations = {
}
