export const generalMixins = {
  computed: {
    checkIfAdmin() {
      return this.$auth.user && this.$auth.user.level === 'owner'
    }
  }
}
