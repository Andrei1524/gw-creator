<template>
  <div>
    <div class='giveaways-items'>
      <GiveawayItem v-for='giveaway in giveaways' :key='giveaway.id' :giveaway='giveaway'/>
    </div>
    <b-pagination
      v-model="currentPage"
      class='mt-2'
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      size='md'
      @input='handleGetGiveaways()'
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GiveawayItem from '~/components/_shared/GiveawayItem'

export default {
  components: { GiveawayItem },

  data() {
    return {
      giveaways: [],
      currentPage: 1,
      perPage: 0,
      rows: 0
    }
  },

  async created() {
    await this.handleGetGiveaways()
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveaways']),

    async handleGetGiveaways() {
      const computedQueries = `?page=${this.currentPage}`
      const response = await this.getGiveaways(computedQueries)
      this.giveaways = response.data.giveaways
      this.perPage = response.data.PAGE_SIZE
      this.rows = response.data.total_items
    }
  },
}
</script>

<style lang='scss' scoped>
.giveaways-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px;
}
</style>
