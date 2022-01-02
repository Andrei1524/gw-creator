<template>
  <div class='giveaway'>
    giveaway page
  </div>
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
        name: this.giveaway.giveaway_name,
        isMarginLeftAuto: false
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
