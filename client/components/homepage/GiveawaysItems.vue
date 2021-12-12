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

  async mounted() {
    await this.handleGetGiveaways()
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveaways']),

    async handleGetGiveaways() {
      this.giveaways = await this.getGiveaways()
    }
  }
}
</script>
