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

              <div class='table-wrapper mb-2'>
                <b-spinner v-if='loadingTable' class='loader-center' small type="grow"></b-spinner>
                <div v-else class='table'>
                  <div v-for='(enrolledUser, index) in enrolled_users' :key='enrolledUser._id' class='enrolled-user d-flex align-items-center'>
                    <span class='enrolled-user-nr'>{{ index }}</span>
                    <div class='info pl-2'>
                      <h6>{{ enrolledUser.username }}</h6>
                    </div>
                  </div>
                </div>
                <b-pagination
                  v-model="currentPage"
                  class='mt-2'
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  size='md'
                  @input='handleGetEnrolledUsers'
                ></b-pagination>
              </div>
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
      currentPage: 1,
      perPage: 0,
      rows: 0,
      giveaway: null,
      enrolled_users: [],
      searchEnrolled: '',
      loadingEnroll: false,
      loadingTable: false,
      computeTimeLeft
    }
  },

  async fetch() {
    this.giveaway = await this.getGiveaway(this.$route.params.id)
    await this.handleGetEnrolledUsers()
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

    ...mapActions('modules/giveaways', ['getGiveaway', 'enrollInGiveaway', 'getGiveawayEnrolledUsers']),

    async handleEnrollInGiveaway() {
      await this.enrollInGiveaway(this.giveaway.generatedId)
      this.giveaway = await this.getGiveaway(this.$route.params.id)
    },

    async handleGetEnrolledUsers() {
      this.loadingTable = true
      const computedQueries = `?page=${this.currentPage}`
      const payload = {
        generatedId: this.giveaway.generatedId,
        computedQueries
      }
      const response = await this.getGiveawayEnrolledUsers(payload)
      this.enrolled_users = response.data.enrolled_users
      this.perPage = response.data.PAGE_SIZE
      this.rows = response.data.total_items
      this.loadingTable = false
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

.table-wrapper {
  .enrolled-user {
    background: $black;
    margin-top: 2px;
  }

  .enrolled-user-nr {
    background: #333F44;
    width: 30px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
