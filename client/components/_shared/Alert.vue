<template>
  <div class="custom-alert">
    <b-alert
      ref="alert"
      :show="dismissCountDown"
      fade
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      :variant="variant"
      dismissible
    >
      {{ alertMessage }}
    </b-alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },

  computed: {
    ...mapState('modules/alert', ['showDismissibleAlert', 'alertMessage', 'variant']),
  },

  watch: {
    showDismissibleAlert() {
      if (this.showDismissibleAlert) {
        this.showAlert()
      }
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('modules/alert', [
      'setShowDismissibleAlert'
    ]),

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      this.setShowDismissibleAlert(false)
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/css/variables';

.custom-alert {
  position: fixed;
  top: 80px;
  right: 30px;
  z-index: 2;
}
</style>
