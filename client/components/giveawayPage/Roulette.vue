<template>
  <div class='roulette'>
    <b-spinner v-if='loadingRoulette' type="grow"></b-spinner>

    <div v-show="!loadingRoulette" class='roulette-wrapper'>
      <div v-show='!winner' class='canvas'>
        <canvas id="c"></canvas>
      </div>

      <div v-if='winner'>
        WINNER: {{ winner.username }}
      </div>

      <b-button
        v-show="computeEnrollBtn"
        id='pick_winner'
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
// TODO:
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
      requestAnimationFrame: null,
      cancelAnimationFrame: null,
      animFrameId: null,
      resizeEventId: null,
      enrolledUsersData: [],
      rects: [],
      isRouletteRolling: false,
      loadingRoulette: false,
      winner: null,
      randomWinnerStop: 0
    }
  },

  computed: {
    computeEnrollBtn() {
      // if user is the one who created
      // if there were no user extracted
      return this.$auth.user && (this.$auth.user._id === this.giveaway.created_by) && !this.winner
    }
  },

  watch: {
    giveaway() {
      this.resetRoulette()
    }
  },

  async mounted() {
    await this.initCanvasSockets()
    // event listeners
    window.addEventListener('resize', _.debounce(() => {
      if (!this.winner) {
        this.emitReady()
        this.initCanvas()
      }
    }, 200))
  },

  destroyed() {
    window.cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', () => {
      this.emitReady()
      this.initCanvas()
    })
    this.animFrameId = null
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveawayEnrolledUsers']),

    async resetRoulette() {
      this.winner = null

      if (!this.giveaway.rouletteEnded) {
        await this.initCanvasSockets()
      } else {
        this.emitReady()
      }
    },

    initCanvasSockets() {
      // init socket
      if (!this.giveaway.rouletteEnded) {
        this.loadingRoulette = true
        this.socket = this.$nuxtSocket({
          name: 'home',
          channel: '/giveaway',
          reconnection: true
        })

        // emit ready event
        this.emitReady()

        this.socket.on('newGeneratedRects', (newGeneratedRects, randomWinnerStop) => {
          this.rects = randomWinnerStop

          if (randomWinnerStop) {
            this.isRouletteRolling = true
            this.randomWinnerStop = randomWinnerStop
          }
          this.loadingRoulette = false
        })

        this.socket.on('winnerRect', winnerRect => {
          if (winnerRect) {
            const index = this.rects.findIndex(r => r._id === winnerRect._id)
            this.rects[index].isWinner = true

            this.winner = winnerRect
          }
        })

        this.onConnect()

        // listen to roulette stop events
        this.socket.on('rouletteEnded', (isRouletteRolling, winner) => {
          this.isRouletteRolling = isRouletteRolling
          this.winner = winner
        })
      } else { // roulette ended and winner chosen
        this.winner = this.giveaway.winner
      }
    },

    onConnect() {
      this.socket.on('connect', async () => {
        await this.initCanvas()
      })
    },

    emitReady() {
      const canvas = document.getElementById("c");
      this.socket.emit('ready', this.generatedId, canvas.width)
    },

    async initCanvas() {
      if (this.animFrameId !== null) {
        window.cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null
      }

      const btn = document.getElementById("pick_winner");
      const canvas = document.getElementById("c");
      const ctx = canvas.getContext("2d");

      // const RouletteFunctions = require("./rouletteFunctions");

      canvas.width = document
        .querySelector(".roulette")
        .getBoundingClientRect().width;
      canvas.height = 75;
      this.rects = [];

      // config
      const rectWidth = 75;

      // line
      const line = {
        x: canvas.width / 2,
        y: 0,
        width: 5,
        height: canvas.height
      }
      // ===================
      let rollWithEase = 0;

      const drawRects = () => {
        for (let i = 0; i < this.rects.length; i++) {
          if (!this.rects[i].isWinner) {
            ctx.fillStyle = "#000";
            ctx.fillRect(this.rects[i].x + rollWithEase, 0, rectWidth, rectWidth);

            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText(`${this.rects[i].username}`, this.rects[i].x + rollWithEase + ctx.measureText(`${this.rects[i].username}`).width / 2, rectWidth / 2);
          } else {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.rects[i].x + rollWithEase, 0, rectWidth, 75);

            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText(`${this.rects[i].username}`, this.rects[i].x + rollWithEase + ctx.measureText(`${this.rects[i].username}`).width / 2, rectWidth / 2);
          }
        }
      }

      // ========================
      if (this.computeEnrollBtn) {
        btn.addEventListener("click", () => {
          this.isRouletteRolling = true
          this.socket.emit('startSpin', this.generatedId, canvas.width)
        });
      }

      await this.socket.on('newGeneratedRects', (newGeneratedRects, randomWinnerStop) => {
        this.rects = newGeneratedRects
        this.randomWinnerStop = randomWinnerStop
      })

      // sockets listener
      this.socket.on('spin', (data) => {
        rollWithEase = data + (canvas.width / 2) - this.randomWinnerStop // handle this on server TODO:
      })

      const drawRouletteWheel = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRects();

        // draw centered line
        ctx.rect(line.x, line.y, line.width, line.height);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();

        // emit ready event for the server
        // this.socket.emit("ready", this.generatedId) // TODO: fix this, remove from loop
        this.animFrameId = window.requestAnimationFrame(drawRouletteWheel)
      }

      drawRouletteWheel();
    }
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
