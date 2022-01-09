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
      animFrameId: null
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
    window.cancelAnimationFrame(this.animFrameId);
    this.animFrameId = null
  },

  methods: {
    onConnect() {
      this.socket.on('connect', () => {
        console.log('connected as: ', this.socket.id)
      })
    },


    initCanvas() {
      const btn = document.getElementById("pick_winner");
      const canvas = document.getElementById("c");
      const ctx = canvas.getContext("2d");

      // const RouletteFunctions = require("./rouletteFunctions");

      canvas.width = document
        .querySelector(".roulette")
        .getBoundingClientRect().width;
      canvas.height = 75;
      const rects = [];
      const nrOfEnrolled = 25;

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

      // functions =================== // TODO: move code to server side
      function generateRects() {
        for (let i = 0; i < nrOfEnrolled; i++) {
          rects.push({
            id: i,
            x: startRectX
          });
          startRectX += rectWidth + gap;
        }
      }
      generateRects();

      // ===================
      let winnerRect = null;

      // canvas code
      let startWheelRoll = false;

      // easing
      let spinTime = 0;
      let spinStart = 0;
      let spinTimeTotal = 0;

      //
      let rollWithEase = 0;

      function drawRects() {
        for (let i = 0; i < rects.length; i++) {
          if (!rects[i].isWinner) {
            ctx.fillStyle = "#000";
            ctx.fillRect(rects[i].x + rollWithEase, 0, rectWidth, 75);
          } else {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(rects[i].x + rollWithEase, 0, rectWidth, 75);
          }
        }
      }

      function draw() {
        const randomWinnerNr = Math.floor(Math.random() * (nrOfEnrolled + 1)); // TODO: stop the wheel on the winner
        winnerRect = rects.find((rect) => rect.id === randomWinnerNr);
        const winnerIndex = rects.findIndex((rect) => rect.id === randomWinnerNr);
        spinStart = winnerRect.x - (canvas.width / 2) + Math.floor(Math.random() * (rectWidth - 10)) + 1;
        rects[winnerIndex].isWinner = true;
      }

      function spin() {
        draw();
        spinTimeTotal = winnerRect.x * 10; // control the length of the spinn
        startWheelRoll = true;
        rollWheel();
      }
      // =========================
      btn.addEventListener("click", () => {
        spin()
        this.socket.emit('spin')
      });

      function easeOutQuart(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      }
      const rollWheel = () => {
        if (startWheelRoll) {
          spinTime += 30;

          if (spinTime >= spinTimeTotal) {
            console.log("stopped wheel", spinTimeTotal);

            startWheelRoll = false;
            window.cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null
            return;
          } else {
            const rollTimeWithEase = easeOutQuart(
              spinTime,
              0,
              spinStart,
              spinTimeTotal
            );
            rollWithEase = -rollTimeWithEase;
            drawRouletteWheel();
          }
        }
        this.animFrameId = window.requestAnimationFrame(rollWheel)
      }

      const drawRouletteWheel = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRects();

        // draw centered line
        ctx.rect(line.x, line.y, line.width, line.height);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();

        // emit ready event for the server
        this.socket.emit("ready", this.generatedId)
      }

      drawRouletteWheel();
    }
  }
}
</script>

<style lang='scss'>
#c {
  border: 1px solid black;
}
</style>
