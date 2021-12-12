<template>
  <div class='giveaway-item'>
    <div class='title'>
      <span> from nVidia </span>
      <h5>{{ giveaway.giveaway_name }}</h5>
    </div>
    <div class='overlay'></div>
  </div>
</template>

<script>
export default {
  name: 'GiveawayItem',
  props: {
    giveaway: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang='scss'>
.giveaway-item {
  position: relative;
  border: 1px solid black;
}
</style>
