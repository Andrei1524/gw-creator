<template>
  <div>
    <b-spinner v-if='loading' class='loader-center' small type="grow"></b-spinner>
    <div v-else class='giveaway-items-wrapper'>
      <div class='giveaways-items'>
        <NuxtLink v-for='giveaway in giveaways' :key='giveaway.id' :to="`giveaways/${giveaway.generatedId}/${friendlyUrl(giveaway.giveaway_name)}`">
          <GiveawayItem :giveaway='giveaway' />
        </NuxtLink>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GiveawayItem from '~/components/_shared/GiveawayItem'
import { friendlyUrl } from '~/utils/generalUtils'

export default {
  components: { GiveawayItem },

  data() {
    return {
      giveaways: [],
      currentPage: 1,
      perPage: 0,
      rows: 0,
      loading: false,
      friendlyUrl
    }
  },

  async created() {
    await this.handleGetGiveaways()
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveaways']),

    async handleGetGiveaways() {
      this.loading = true
      const computedQueries = `?page=${this.currentPage}`
      const response = await this.getGiveaways(computedQueries)
      this.giveaways = response.data.giveaways
      this.perPage = response.data.PAGE_SIZE
      this.rows = response.data.total_items
      this.loading = false
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
