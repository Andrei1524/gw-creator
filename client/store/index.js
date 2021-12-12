export const state = () => ({
  splitLayoutSettings: {
    showPageHeader: false,
    componentToShow: '',
  }
})

export const mutations = {
  setComponentToShow(state, name) {
    state.splitLayoutSettings.componentToShow = name
  },
}
