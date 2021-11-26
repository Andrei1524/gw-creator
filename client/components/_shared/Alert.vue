<template>
  <div class='custom-alert'>
    <b-alert ref='alert' v-model='showDismissibleAlert' variant='danger' dismissible>
      Dismissible Alert!
    </b-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('modules/alert', [
      'showDismissibleAlert'
    ])
  },

  mounted() {
  }
}
</script>

<style lang='scss' scoped>
@import './assets/css/variables';

.custom-alert {
  position: fixed;
  top: 80px;
  right: 30px;
  z-index: 2;
}
</style>
