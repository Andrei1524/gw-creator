export const showAlert = (commit, message, variant) => {
  commit('modules/alert/setAlertMessage', message.response !== undefined ? message.response.data.error : message , {root: true})
  commit('modules/alert/setShowDismissibleAlert', true, {root: true})
  commit('modules/alert/setAlertVariant', variant, {root: true})
}
