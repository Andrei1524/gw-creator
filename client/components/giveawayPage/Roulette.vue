<template>
  <div class='roulette'>
    <b-spinner v-if='loadingRoulette' type="grow"></b-spinner>
    <div v-show='!loadingRoulette' class='canvas'>
      <canvas v-if="!giveaway.winner || isRouletteRolling" id="c"></canvas>
    </div>
    <div v-if='winner && !isRouletteRolling'>
      WINNER: {{ winner.username }}
    </div>

    <b-button
      v-if="$auth.user"
      id='pick_winner'
      :disabled='winner !== null || isRouletteRolling'
      class='custom-btn pick font-weight-bolder mt-4 margin-auto' type="submit"
      variant="primary"
    >
      <b-spinner v-show='isRouletteRolling' small type="grow" class='mr-1'></b-spinner>
      PICK WINNER
    </b-button>
  </div>
</template>

<script>
// TODO:
// start the game server connection when one player joins the page
// if there are no players left on the giveaway page, close the game loop on the server
// establish connection with the server | add some loader

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
      enrolledUsersData: [],
      rects: [],
      isRouletteRolling: false,
      loadingRoulette: false,
      winner: null,
    }
  },

  async mounted() {
    if (!this.giveaway.winner || this.giveaway.isRouletteRolling) {
      // init socket
      this.socket = this.$nuxtSocket({
        name: 'home',
        channel: '/giveaway',
        reconnection: true
      })

      // emit ready event
      const canvas = document.getElementById("c");
      this.socket.emit('ready', this.generatedId, canvas.width)
      // await this.getRandomUsersForDefaultWheel()
      await this.socket.on('newGeneratedRects', newGeneratedRects => {
        this.rects = newGeneratedRects
        // console.log(newGeneratedRects.find(rect => rect.isWinner))
      })

      await this.socket.on('winnerRect', winnerRect => {
        if (winnerRect) {
          console.log(winnerRect, 'winner rect')
          const index = this.rects.findIndex(r => r._id === winnerRect._id)
          this.rects[index].isWinner = true
        }
      })

      this.onConnect()

      // listen to roulette stop events
      this.socket.on('rouletteEnds', (isRouletteRolling, winner) => {
        this.isRouletteRolling = isRouletteRolling
        this.winner = winner

        console.log(isRouletteRolling, winner)
      })
    } else {
      this.winner = this.giveaway.winner
    }
  },

  destroyed() {
    window.cancelAnimationFrame(this.animFrameId);
    this.animFrameId = null
  },

  methods: {
    ...mapActions('modules/giveaways', ['getGiveawayEnrolledUsers']),

    onConnect() {
      this.socket.on('connect', async () => {
        await this.initCanvas()
      })
    },

    async getRandomUsersForDefaultWheel() {
      const payload = {
        generatedId: this.generatedId,
        computedQueries: ""
      }
      const response = await this.getGiveawayEnrolledUsers(payload)
      this.enrolledUsersData = response.data.enrolled_users
    },

    async initCanvas() {
      this.loadingRoulette = true
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
      const gap = 5;
      let startRectX = 0;

      // line
      const line = {
        x: canvas.width / 2,
        y: 0,
        width: 5,
        height: canvas.height
      }

      // functions ===================
      const generateDefaultRects = () => {
        for (let i = 0; i < this.enrolledUsersData.length; i++) {
          this.rects.push({
            id: i,
            x: startRectX,
            username: this.enrolledUsersData[i].username
          });
          startRectX += rectWidth + gap;
        }
      }
      generateDefaultRects();

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
      btn.addEventListener("click", () => {
        this.isRouletteRolling = true
        this.socket.emit('startSpin', this.generatedId, canvas.width)
      });

      await this.socket.on('newGeneratedRects', newGeneratedRects => {
        this.rects = newGeneratedRects
        this.loadingRoulette = false
      })

      // sockets listener
      this.socket.on('spin', (data) => {
        rollWithEase = data
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

.pick {
  background-color: $warm-red;
  font-size: 23px;
  box-shadow: 0px 3px 7px 0px #0000006e;
}
</style>
