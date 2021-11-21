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
              :label="'Email:'"
              :label-for="'email'"
              :type="'email'"
              :placeholder="'enter your email...'"
              :required="true"
            />
            <custom-input
              :label="'Password:'"
              :label-for="'password'"
              :type="'password'"
              :placeholder="'enter your password...'"
              :required="true"
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
import customInput from '~/components/customFormElements/customInput'

export default {
  components: { customInput },

  data() {
    return {
      form: {
        email: '',
        name: '',
      },
      show: true,
    }
  },

  methods: {
    onSubmit(event) {
      // event.preventDefault()
      // alert(JSON.stringify(this.form))
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
