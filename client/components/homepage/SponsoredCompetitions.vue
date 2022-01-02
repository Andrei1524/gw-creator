<template>
  <div>
    <h5 class='d-flex align-items-center'>
      <b-icon
        class='mr-2'
        icon="globe2"
        aria-hidden="true"
        style="width: 25px; height: 25px"
      ></b-icon>
      Sponsored Competitions
    </h5>

    <b-carousel
      id="carousel-no-animation"
      class='custom-carousel'
      data-interval="false"
      style="text-shadow: 0px 0px 2px #000"
      no-animation
      indicators
      img-width="1024"
      img-height="200"
    >
      <b-carousel-slide
        img-height='200'
        caption="Worldwide GPU Giveaway! RTX 3080!"
        text='from nVidia'
        img-src="~/assets/images/gw_background_default.PNG"
      >
        <span class='slide-pin hours-left'>3hrs left</span>
        <span class='slide-pin participants'>20/100
          <b-icon
            icon="unlock-fill"
            aria-hidden="true"
            style="width: 20px; height: 20px"
          ></b-icon>
        </span>
      </b-carousel-slide>
<!--      <b-carousel-slide-->
<!--        img-height='200'-->
<!--        caption="Second Slide"-->
<!--        img-src="https://picsum.photos/1024/480/?image=12"-->
<!--      ></b-carousel-slide>-->
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang='scss'>
@import './assets/css/variables';

.custom-carousel {
  max-height: 150px;

  img {
    max-height: 150px;
  }

  .carousel-indicators {
    margin-bottom: 0;
  }

  .carousel-caption {
    padding: 0;
    right: unset;
    top: 0;
    left: 0;
    height: fit-content;
    text-align: left;
    width: 100%;
    height: 100%;
    padding-left: 13px;
    padding-top: 5px;

    h3 {
      font-size: 21px;
      color: $light-gray;
      font-weight: 600;
      margin-bottom: 0;
    }

    p {
      font-size: 14px;
    }

    .slide-pin {
      font-size: 12px;
    }

    .hours-left {
      position: absolute;
      top: 5px;
      right: 13px;
      font-size: 12px;
    }

    .participants {
      position: absolute;
      bottom: 5px;
      right: 13px;
    }
  }
}
</style>
