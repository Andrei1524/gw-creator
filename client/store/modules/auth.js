export const state = () => ({
  user: null,
  loggedIn: false
})

export const getters = {
  isLoggedIn(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  }
}
