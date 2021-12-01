<template>
  <div class="create-page mt-4">
    <div>
      <h4>Type: <span class="font-weight-light">normal giveaway</span></h4>

      <b-form
        class="custom-form"
        novalidate
      >
        <custom-input
          v-model='form.giveawayName'
          :name="'giveawayName'"
          :label="'Giveaway name:'"
          :label-for="'giveawayName'"
          :type="'text'"
          :placeholder="'enter a name'"
          :v="$v.form.giveawayName"
          :required="true"
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
import customInput from '~/components/customFormElements/customInput'

export default {
  name: 'CreateGiveaway',
  components: { customInput },
  middleware: 'auth',
  layout: '2columns',

  data() {
    return {
      form: {
        giveawayName: ''
      }
    }
  },

  validations: {
    form: {
      giveawayName: {
        required,
        minLength: minLength(3),
      },
    },
  },

  mounted() {
    // TODO: refactor method into utils maybe
    this.setComponentToShow('share-giveaway')
  },

  methods: {
    ...mapMutations({
      setComponentToShow: 'setComponentToShow'
    }),
  }
}
</script>
