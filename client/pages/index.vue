<template>
  <div class='homepage mt-3'>
    <SponsoredCompetitions />
    <GiveawaysItems class='mt-4' />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SponsoredCompetitions from '~/components/homepage/SponsoredCompetitions'
import GiveawaysItems from '~/components/homepage/GiveawaysItems'

export default {
  name: 'Homepage',
  components: { SponsoredCompetitions, GiveawaysItems },
  layout: 'SplitLayout',

  data() {
    return {

    }
  },
  mounted() {
    this.setComponentToShow({
      componentToShow: 'share-giveaway',
      isMarginLeftAuto: true,
      showRight: true
    })
  },

  methods: {
    ...mapMutations({
      setComponentToShow: 'setComponentToShow'
    }),
  }
}
</script>
