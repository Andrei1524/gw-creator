<template>
  <div class='giveaways-items'>
    items
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      giveaways: []
    }
  },

  async created() {
    await this.handleGetGiveaways()
  },


  methods: {
    ...mapActions('modules/giveaways', ['getGiveaways']),

    async handleGetGiveaways() {
      const computedQueries = `?page=1`
      this.giveaways = await this.getGiveaways(computedQueries)
    }
  },
}
</script>
