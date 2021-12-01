<template>
  <div class="giveaway-type gw-light">
    <h6>{{ title }}</h6>
    <div class='ml-4'>
      <span
        :style="{ color: option == option1 ? '#C3C5AB' : '#ffffff63' }"
        class="gw-option"
        @click="chooseOption(option1)"
        ><font-awesome-icon v-if="icon_name1" :icon="['fas', icon_name1]" />
        {{ option1 }}</span
      >
      <span>/</span>
      <span
        :style="{ color: option == option2 ? '#C3C5AB' : '#ffffff63' }"
        class="gw-option"
        @click="chooseOption(option2)"
        ><font-awesome-icon v-if="icon_name2" :icon="['fas', icon_name2]" />
        {{ option2 }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'title',
    'option1',
    'option2',
    'icon_name1',
    'icon_name2',
    'default_option',
    'disabled',
  ],
  data() {
    return {
      option: '',
    }
  },
  watch: {
    default_option() {
      this.option = this.default_option
    },
  },
  created() {
    this.option = this.default_option
  },
  methods: {
    chooseOption(option) {
      if (!this.disabled) {
        this.option = option
        this.$emit('choose_option', {
          name: this.name,
          option,
        })
      }
    },
  },
}
</script>

<style lang="scss">
/* misc */
.gw-option {
  cursor: pointer;
  user-select: none;
}
.giveaway-type {
  display: flex;
  align-items: center;
}
.giveaway-type > h4 {
  display: flex;
  margin-right: 25px;
}
.giveaway-type > div {
  font-size: 16px;
}
.giveaway-type > div::after {
  content: '';
  display: block;
  width: 120%;
  height: 2px;
  background-color: #d0bb8f;
  opacity: 0.2;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 2px;
}
</style>
