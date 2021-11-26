export const state = () => ({
  alertMessage: '',
  variant: '',
  showDismissibleAlert: false
})

export const mutations = {
  setShowDismissibleAlert(state, value) {
    state.showDismissibleAlert = value
  },

  setAlertMessage(state, message) {
    state.alertMessage = message
  },

  setAlertVariant(state, variant) {
    state.variant = variant
  }
}
