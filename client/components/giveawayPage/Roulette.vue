<template>
  <div class='roulette'>
    <canvas id="c"></canvas>
    <button id='pick_winner'>pick winner</button>
  </div>
</template>

<script>
// TODO:
// start the game server connection when one player joins the page
// if there are no players left on the giveaway page, close the game loop on the server
// establish connection with the server | add some loader

export default {
  name: 'Roulette',
  props: {
    generatedId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      requestAnimationFrame: null,
      cancelAnimationFrame: null,
      id: null
    }
  },

  mounted() {
    // init socket
    this.socket = this.$nuxtSocket({
      name: 'home',
      channel: '/giveaway',
      reconnection: true
    })

    // connect to the server
    this.onConnect()
    this.initCanvas()
  },

  destroyed() {
    window.cancelAnimationFrame(this.id);
    this.id = undefined;
  },

  methods: {
    onConnect() {
      this.socket.on('connect', () => {
        console.log('connected as: ', this.socket.id)
      })
    },

    initCanvas() {
      // const btn = document.getElementById('pick_winner')
      const canvas = document.getElementById("c")
      const ctx = canvas.getContext('2d');

      canvas.width = document.querySelector('.roulette').getBoundingClientRect().width
      canvas.height = 75

      const nrOfEnrolled = 25
      const rectWidth = 75
      const gap = 5
      let startRectX = 0

      let xRollLeft = 0
      const animationSpeed = 1;

      const rects = []
      function generateRects() {
        for (let i = 0; i < nrOfEnrolled; i++) {
          rects.push({
            x: startRectX
          })
          startRectX += rectWidth + gap
        }
      }
      generateRects()

      function drawRects() {
        for (let i = 0; i < rects.length; i++) {
          ctx.strokeRect(rects[i].x + xRollLeft, 0, rectWidth, 75)
        }
      }

      function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        xRollLeft -= animationSpeed

        drawRects()

        window.requestAnimationFrame(update)
      }

      update()
    }
  }
}
</script>

<style lang='scss'>
#c {
  border: 1px solid black;
}
</style>
