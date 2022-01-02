<template>
  <b-container fluid>
    <div class='giveaway'>
      <b-row>
        <b-col cols='12' md='5'>
          <div class='giveaway-info'>
            <img class='w-100' :src="require('@/assets/images/gw_background_default.PNG')" alt=''>
          </div>
        </b-col>

        <b-col cols='12' md='7'>
          <div class='giveaway-roulette'>roulette</div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "GiveawayPage",
  layout: 'SplitLayout',

  data() {
    return {
      giveaway: {}
    }
  },

  async fetch() {
    this.giveaway = await this.getGiveaway(this.$route.params.id)
  },

  watch: {
    giveaway() {
      this.setComponentToShow({
        showPageHeader: true,
        headerTitle: this.giveaway.giveaway_name,
        componentToShow: null,
        isMarginLeftAuto: false,
        showRight: false
      })
    }
  },

  methods: {
    ...mapMutations({
      setComponentToShow: 'setComponentToShow'
    }),

    ...mapActions('modules/giveaways', ['getGiveaway']),
  },
}
</script>
