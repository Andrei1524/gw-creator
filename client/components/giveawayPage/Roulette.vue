<template>
  <div class='roulette'>
    <b-spinner v-if='loadingRoulette' type="grow"></b-spinner>

    <div v-show="!loadingRoulette" class='roulette-wrapper'>
      <div v-show='!winner' class='canvas'>
        // TODO: redo this with box div's
      </div>

      <div v-if='winner'>
        WINNER: {{ winner.username }}
      </div>

      <b-button
        v-show="computeEnrollBtn" id='pick_winner'
        :disabled='winner !== null || isRouletteRolling'
        class='custom-btn pick font-weight-bolder mt-4 margin-auto' type="submit"
        variant="primary"
      >
        <b-spinner v-show='isRouletteRolling' small type="grow" class='mr-1'></b-spinner>
        PICK WINNER
      </b-button>
    </div>
  </div>
</template>

<script>
// start the game server connection when one player joins the page
// if there are no users left on the giveaway page, close the game loop on the server
// establish connection with the server | add some loader
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'Roulette',
  props: {
    giveaway: {
      type: Object,
      required: true
    },

    generatedId: {
      type: String,
      required: true
    },

    enrolledUsers: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data() {
    return {
      enrolledUsersData: [],
      rects: [],
      isRouletteRolling: false,
      loadingRoulette: false,
      winner: null,
    }
  },

  computed: {
    computeEnrollBtn() {
      // if user is the one who created
      // if there were no user extracted
      return this.$auth.user && (this.$auth.user._id === this.giveaway.created_by) && !this.winner
    }
  },

  mounted() {
    // event listeners
    window.addEventListener('resize', _.debounce(() => {
      // TODO: adjust generated roulette width
    }, 200))
  },

  destroyed() {
    window.removeEventListener('resize', () => {
      // TODO: adjust generated roulette width
    })
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveawayEnrolledUsers']),
  }
}
</script>

<style lang='scss'>
@import './assets/css/variables';

#c {
  //border: 1px solid black;
}

.roulette {
  height: 85px;
}

.pick {
  background-color: $warm-red;
  font-size: 23px;
  box-shadow: 0px 3px 7px 0px #0000006e;
}
</style>
