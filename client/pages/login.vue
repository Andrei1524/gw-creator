<template>
  <div class="login-page">
    <b-container class="mt-5 form">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <h1 class='mt-3 mb-4'>Login</h1>
          <b-form
            v-if="show"
            class="custom-form"
            novalidate
          >
            <custom-input
              v-model='form.username'
              :name="'username'"
              :label="'Username:'"
              :label-for="'username'"
              :type="'text'"
              :placeholder="'enter your username...'"
              :v="$v.form.username"
              :required="true"
            />

            <custom-input
              v-model='form.password'
              :name="'password'"
              :label="'Password:'"
              :label-for="'password'"
              :type="'password'"
              :placeholder="'enter your password...'"
              :required="true"
              :v="$v.form.password"
            />

            <b-button class='custom-btn' :class="{ 'btn-error': $v.$error }" type="submit" variant="primary" @click='onSubmit'>
              <b-icon
                v-if='$v.$error'
                icon="outlet"
                aria-hidden="true"
                style="width: 30px; height: 30px;"
              ></b-icon>
              <b-icon
                v-else
                icon="person-plus-fill"
                aria-hidden="true"
                style="width: 30px; height: 30px;"
              ></b-icon>
              Login
            </b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import customInput from '~/components/customFormElements/customInput'

export default {
  components: { customInput },

  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true,
    }
  },

  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
      },

      password: {
        required,
        minLength: minLength(3),
      },
    },
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;
      // to form submit after this
      const params = { ...this.form }
      console.log(params)
    },
  },
}
</script>
