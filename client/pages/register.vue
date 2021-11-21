<template>
  <div class="register-page">
    <b-container class="mt-5">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <b-form
            v-if="show"
            class="custom-form"
            @submit="onSubmit"
            @reset="onReset"
          >
            <custom-input
              :name="'email'"
              :label="'Email:'"
              :label-for="'email'"
              :type="'email'"
              :placeholder="'enter your email...'"
              :default_input_value="form.email"
              :required="true"
              @emit_input="updateInput"
            />
            <custom-input
              :name="'username'"
              :label="'Username:'"
              :label-for="'username'"
              :type="'text'"
              :placeholder="'enter your username...'"
              :default_input_value="form.username"
              :required="true"
              @emit_input="updateInput"
            />

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import customInput from '~/components/customFormElements/customInput'

export default {
  components: { customInput },
  mixins: [validationMixin],

  data() {
    return {
      form: {
        email: '',
        username: '',
      },
      show: true,

      validations: {
        form: {
          email: {
            required,
          },
          username: {
            required,
            minLength: minLength(3),
          },
        },
      },
    }
  },

  methods: {
    updateInput(data) {
      this._data.form[data.input_name] = data.data
      this.validateState('username')
    },

    validateState(name) {
      // TODO: FIX THIS
      // https://vuejsdevelopers.com/2018/08/27/vue-js-form-handling-vuelidate/
      const { $dirty, $error } = this._data.form[name];
      return $dirty ? !$error : null;
    },

    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },

    onReset(event) {
      // event.preventDefault()
      // // Reset our form values
      // this.form.email = ''
      // this.form.name = ''
      // // Trick to reset/clear native browser form validation state
      // this.show = false
      // this.$nextTick(() => {
      //   this.show = true
      // })
    },
  },
}
</script>
