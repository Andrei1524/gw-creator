<template>
  <b-form-group id="input-group" :class="{ 'has-error': v.$error }">
    <b-form-textarea
      id="textarea-default"
      v-model="input_value"
      placeholder="Default textarea"
      :style="{color: highlight.color, borderBottom: highlight.borderBottom}"
      rows="3"
      no-resize
      @input="v.$touch()"
      @change="colorChange"
    ></b-form-textarea>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },

    labelFor: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      default: ""
    },

    v: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      highlight: {
        color: '#ffffff73',
        borderBottom: '2px solid #d0bb8f2e',
      },
    }
  },

  computed: {
    input_value: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  methods: {
    colorChange() {
      this.highlight = this.input_value.length > 0 ? {color: '#FFF', borderBottom: '2px solid #D0BB8F'} : {color: '#ffffff73', borderBottom: '2px solid #d0bb8f2e'}
    }
  }
}
</script>
