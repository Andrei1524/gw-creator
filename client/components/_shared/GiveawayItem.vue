<template>
  <div class='giveaway-item'>
    <div class='title position-absolute'>
      <span class='font-size-12'>from User </span>
      <h6>{{ giveaway.giveaway_name }}</h6>
    </div>

    <div class='hours-left position-absolute'>
      <span class='font-size-12 d-block'>3 hours left</span>
    </div>

    <div class='participants position-absolute d-flex'>
      <span class='font-size-12 d-block mr-1'>20/{{ giveaway.nr_of_participants }} </span>
      <b-icon
        v-if="giveaway.status === 'closed'"
        icon="lock-fill"
        aria-hidden="true"
      ></b-icon>

      <b-icon
        v-else
        icon="unlock-fill"
        aria-hidden="true"
      ></b-icon>
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
  height: 80px;
}

.hours-left{
  top: 6px;
  right: 6px;
}

.participants {
  bottom: 6px;
  right: 6px;
}

.title {
  bottom: 6px;
  left: 6px;

  h6 {
    margin: 0;
  }
}
</style>
