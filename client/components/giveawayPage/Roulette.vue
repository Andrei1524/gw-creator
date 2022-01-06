<template>
  <div class='roulette'>
    roulette component
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
  },

  methods: {
    onConnect() {
      this.socket.on('connect', () => {
        console.log('connected as: ', this.socket.id)
      })
    }
  }
}
</script>
