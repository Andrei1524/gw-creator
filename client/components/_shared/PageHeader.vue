<template>
  <div class='page-header mt-2 mb-2'>
    <div class='page-header-wrapper'>
      <div class='page-title d-flex align-content-center align-items-center justify-content-between'>
        <div class='title d-flex align-items-center'>
          <b-icon
            v-if='bootstrapIcon'
            :icon="bootstrapIcon"
            aria-hidden="true"
            style="width: 25px; height: 25px;"
          ></b-icon>
          <h4 class='ml-2'>{{ title }} </h4>
        </div>

        <div class='buttons'>
          <b-button
            v-if="$auth.user"
            class='custom-btn font-weight-bolder' type="submit"
            variant="primary"
            @click="handleResetRoulette"
          >
            <b-icon
              icon="hdd"
              aria-hidden="true"
            ></b-icon>
            reset roulette
          </b-button>
        </div>
      </div>
    </div>
    <hr class="white-hr" />
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    bootstrapIcon: {
      type: String,
      required: false,
      default: ""
    }
  },

  data() {
    return {
    }
  },

  methods: {
    handleResetRoulette() {
      console.log('reset rlt')
    }
  }
}
</script>
