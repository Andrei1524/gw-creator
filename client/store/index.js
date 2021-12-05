export const state = () => ({
  componentToShow: '',
})

export const mutations = {
  setComponentToShow(state, name) {
    state.componentToShow = name
  },
}
