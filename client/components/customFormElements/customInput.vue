<template>
  <b-form-group id="input-group" :label="label" :label-for="labelFor" :class="{ 'has-error': v.$error }">
    <b-form-input
      :id="labelFor"
      v-model="input_value"
      :placeholder="placeholder"
      :required="required"
      shadow-none
      :style="{color: highlight.color, borderBottom: highlight.borderBottom}"
      :state="v.$dirty ? !v.$error : null"
      aria-describedby="input-live-feedback"
      @input="v.$touch()"
      @change="colorChange"
    ></b-form-input>

    <b-form-invalid-feedback id="input-live-feedback">
      <span v-if='name === "email" && v.$error'>enter a valid email</span>
      <span v-if='["username", "giveawayName"].includes(name) && v.$error'>must be at least 3 characters</span>
    </b-form-invalid-feedback>
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

<style lang="scss" scoped>
@import 'assets/css/variables';

.has-error {
  color: red;
  input {
    border-bottom: 2px solid #dc3545 !important;
  }
}
</style>
