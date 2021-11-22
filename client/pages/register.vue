<template>
  <div class="register-page">
    <b-container class="mt-5 form">
      <b-row class="justify-content-md-center">
        <b-col col lg="4">
          <b-form
            v-if="show"
            class="custom-form"
            novalidate
          >
            <custom-input
              v-model='form.email'
              :name="'email'"
              :label="'Email:'"
              :label-for="'email'"
              :type="'email'"
              :placeholder="'enter your email...'"
              :required="true"
              :v="$v.form.email"
            />
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

            <b-button class='custom-btn' :class="{ 'btn-error': $v.$error }" type="submit" variant="primary" @click='onSubmit'>
              <b-icon
                icon="outlet"
                aria-hidden="true"
                style="width: 30px; height: 30px;"
                v-if='$v.$error'
              ></b-icon>
              <b-icon
                icon="person-plus-fill"
                aria-hidden="true"
                style="width: 30px; height: 30px;"
                v-else
              ></b-icon>
              Register
            </b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import customInput from '~/components/customFormElements/customInput'

export default {
  components: { customInput },

  data() {
    return {
      form: {
        email: '',
        username: '',
      },
      show: true,
    }
  },

  validations: {
    form: {
      email: {
        required,
        email
      },
      username: {
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
      console.log('submit')
    },
  },
}
</script>
