export const state = () => ({
  splitLayoutSettings: {
    showPageHeader: false,
    componentToShow: '',
    isMarginLeftAuto: false
  }
})

export const mutations = {
  setComponentToShow(state, payload) {
    state.splitLayoutSettings.showPageHeader = payload.showPageHeader
    state.splitLayoutSettings.componentToShow = payload.name
    state.splitLayoutSettings.isMarginLeftAuto = payload.isMarginLeftAuto
  },
}
