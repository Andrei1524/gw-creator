<template>
  <div class='giveaway-item cursor-pointer no-select' :style='{"background-image": `url(${require("@/assets/images/gw_background_default.PNG")})`}'>
    <div class='title position-absolute'>
      <span class='font-size-12'>from {{ giveaway.created_by.username }} </span>
      <h6 class='font-weight-bolder'>{{ giveaway.giveaway_name }}</h6>
    </div>

    <div class='hours-left position-absolute'>
      <span class='font-size-12 d-block font-weight-bolder etiquete'> {{ computeTimeLeft() }} </span>
    </div>

    <div class='participants position-absolute d-flex'>
      <span class='font-size-12 d-block mr-1 font-weight-bolder'>20/{{ giveaway.nr_of_participants }} </span>
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
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
  },

  methods: {
    computeTimeLeft() {
      // const now = dayjs()
      // const endDate = dayjs(this.giveaway.end_date)

      return dayjs(this.giveaway.end_date).fromNow()
    }
  }
}
</script>

<style lang='scss'>
@import './assets/css/variables';

.giveaway-item {
  background-position: center;
  background-size: cover;

  position: relative;
  border: 2px solid $black;
  height: 100px;
}

.hours-left{
  top: 6px;
  right: 6px;
}

.participants {
  bottom: 6px;
  right: 6px;
  color: $light-gray;
}

.title {
  bottom: 6px;
  left: 6px;

  h6 {
    color: $light-blue;
    margin: 0;
  }
}
</style>
