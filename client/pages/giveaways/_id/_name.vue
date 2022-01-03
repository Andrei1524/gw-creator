<template>
  <b-container v-if='giveaway' fluid class='mt-4'>
    <div class='giveaway'>
      <b-row>
        <b-col cols='12' md='5'>
          <div class='giveaway-info'>
            <img class='w-100 gw-img' :src="require('@/assets/images/gw_background_default.PNG')" alt=''>
            <p class='description mt-3'>{{ giveaway.description }}</p>
            <b-button class='custom-btn enroll font-weight-bolder' type="submit" variant="primary" @click="handleEnrollInGiveaway">
              <b-spinner v-show='loadingEnroll' small type="grow"></b-spinner>
              <b-icon
                v-if='handleCheckIfEnrolled()'
                icon="check-circle-fill"
                aria-hidden="true"
                style="width: 26px; height: 26px;"
              ></b-icon>
              <b-icon
                v-else
                icon="arrow-up-right-circle-fill"
                aria-hidden="true"
                style="width: 26px; height: 26px;"
              ></b-icon>
              {{ handleComputeEnrollText() }}
            </b-button>

          <!-- ENROLLED USERS TABLE -->
            <div class='enrolled-table mt-3'>
              <div class='table-header'>
                <b-row align-h="between">
                  <b-col cols="8" class='d-flex align-items-center'>
                    <h5>ENROLLED:</h5>
                    <b-form-input
                      v-model="searchEnrolled"
                      class='search ml-3'
                      type="text"
                      placeholder="search..."
                    ></b-form-input>
                  </b-col>
                  <b-col cols="4" class='d-flex align-items-center justify-content-end'>
                    <h6 class='font-size-14'>{{ handleComputeTimeLeft() }}</h6>
                    <div class='status-icon ml-3'>
                      <b-icon
                        v-if="giveaway.status === 'closed'"
                        icon="lock-fill"
                        aria-hidden="true"
                        style="width: 25px; height: 25px"
                      ></b-icon>

                      <b-icon
                        v-else
                        icon="unlock-fill"
                        aria-hidden="true"
                        style="width: 25px; height: 25px"
                      ></b-icon>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <hr class="white-hr mt-2" />
            </div>
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
import { computeTimeLeft } from '~/utils/generalUtils'

export default {
  name: "GiveawayPage",
  layout: 'SplitLayout',

  data() {
    return {
      giveaway: null,
      searchEnrolled: '',
      loadingEnroll: false,
      computeTimeLeft
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

    ...mapActions('modules/giveaways', ['getGiveaway', 'enrollInGiveaway']),

    async handleEnrollInGiveaway() {
      await this.enrollInGiveaway(this.giveaway.generatedId)
      this.giveaway = await this.getGiveaway(this.$route.params.id)
    },

    handleCheckIfEnrolled() {
      return this.giveaway.enrolled_users.includes(this.$auth.user._id)
    },

    handleComputeEnrollText() {
      return this.handleCheckIfEnrolled() ? 'ENROLLED' : 'ENROLL'
    },

    handleComputeTimeLeft() {
      return computeTimeLeft(this.giveaway.end_date)
    }
  },
}
</script>

<style lang='scss'>
@import './assets/css/variables';

.gw-img {
  height: 115px;
  object-fit: cover;
}

.description {
  font-size: 14px;
  font-weight: 300;
  color: $white;
  padding: 5px 8px;
  background: $very-light-opacity-white;
}

.enroll {
  font-size: 21px;
  background: $medium-green;
  box-shadow: 0px 3px 7px 0px #0000006e;
}

.status-icon {
  color: $white;
}

.search {
  background: #d0bb8f26;
  border: none;
  color: #fff;
  border-radius: 20px;
}
</style>
