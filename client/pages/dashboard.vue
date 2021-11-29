<template>
  <div>
    dasboard page
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {}
  },

  async mounted() {
    await this.getDashboard()
  },

  methods: {
    ...mapActions({
      getDashboard: 'modules/dashboard/getDashboard'
    })
  }
}
</script>
