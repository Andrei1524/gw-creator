export const state = () => ({
  splitLayoutSettings: {
    showPageHeader: false,
    headerTitle: '',
    componentToShow: null,
    isMarginLeftAuto: false,
    showRight: false
  }
})

export const mutations = {
  setComponentToShow(state, payload) {
    state.splitLayoutSettings.showPageHeader = payload.showPageHeader
    state.splitLayoutSettings.componentToShow = payload.componentToShow
    state.splitLayoutSettings.isMarginLeftAuto = payload.isMarginLeftAuto
    state.splitLayoutSettings.headerTitle = payload.headerTitle
  },
}
