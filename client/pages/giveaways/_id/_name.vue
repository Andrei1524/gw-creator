<template>
  <div class='giveaway'>
    giveaway page
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "GiveawayPage",

  mounted() {
    this.setComponentToShow({
      showPageHeader: true,
      name: '',
      isMarginLeftAuto: false
    })
  },

  methods: {
    ...mapMutations({
      setComponentToShow: 'setComponentToShow'
    }),
  }
}
</script>
