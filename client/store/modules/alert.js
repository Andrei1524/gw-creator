export const state = () => ({
  alertMessage: '',
  showDismissibleAlert: false
})

export const mutations = {
  setShowDismissibleAlert(state, payload) {
    state.showDismissibleAlert = payload.value
    state.alertMessage = payload.message
  }
}
