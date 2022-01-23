export const state = () => ({
  splitLayoutSettings: {
    componentToShow: null,
    isMarginLeftAuto: false,
    showRight: false
  }
})

export const mutations = {
  setComponentToShow(state, payload) {
    state.splitLayoutSettings.componentToShow = payload.componentToShow
    state.splitLayoutSettings.isMarginLeftAuto = payload.isMarginLeftAuto
  },
}
