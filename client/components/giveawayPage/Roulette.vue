<template>
  <div class='roulette'>
    <canvas id="c"></canvas>
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

  methods: {
    onConnect() {
      this.socket.on('connect', () => {
        console.log('connected as: ', this.socket.id)
      })
    },

    initCanvas() {
      const c = document.getElementById("c")
      c.width = document.querySelector('.roulette').getBoundingClientRect().width
      // game loop
      // let spinTime = 0
      // let spinTimeTotal = 0

      function init() {
        window.requestAnimationFrame(draw);
      }

      function draw() {
        const ctx = c.getContext("2d")
        ctx.clearRect(0, 0, c.getBoundingClientRect().width, 80)

        ctx.rect(0, 0, 80, 80);
        ctx.fill()
        window.requestAnimationFrame(draw);
      }

      init();
    }
  }
}
</script>

<style lang='scss'>
#c {
  border: 1px solid black;
}
</style>
