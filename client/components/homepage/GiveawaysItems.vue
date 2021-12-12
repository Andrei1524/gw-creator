<template>
  <div class='giveaways-items'>
    <GiveawayItem v-for='giveaway in giveaways' :key='giveaway.id' :giveaway='giveaway'/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GiveawayItem from '~/components/_shared/GiveawayItem'

export default {
  components: { GiveawayItem },

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

<style lang='scss' scoped>
.giveaways-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
