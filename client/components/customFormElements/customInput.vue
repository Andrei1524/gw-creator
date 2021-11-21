<template>
  <b-form-group id="input-group" :label="label" :label-for="labelFor">
    <b-form-input
      :id="labelFor"
      v-model="input_value"
      :placeholder="placeholder"
      :required="required"
      shadow-none
      :style="{color: highlight.color, borderBottom: highlight.borderBottom}"
      aria-describedby="input-1-live-feedback"
      @change="colorChange"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    labelFor: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: false,
      default: ''
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
    },

    defaultInputValue: {
      type: String,
      required: false,
      default: ''
    },

    // validateState: {
    //   type: Function,
    //   required: false,
    // },
  },

  data() {
    return {
      highlight: {
        color: '#ffffff73',
        borderBottom: '2px solid #d0bb8f2e',
      },
      input_value: '',
    }
  },

  created() {
    this.input_value = this.defaultInputValue
  },

  methods: {
    colorChange() {
      this.highlight = this.input_value.length > 0 ? {color: '#FFF', borderBottom: '2px solid #D0BB8F'} : {color: '#ffffff73', borderBottom: '2px solid #d0bb8f2e'}
      this.$emit('emit_input', {
        data: this.input_value,
        input_name: this.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variables';
</style>
