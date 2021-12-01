<template>
  <div class="create-page">
    <div>
      <h4>Type: <span class="font-weight-light">normal giveaway</span></h4>

      <b-row>
        <b-col cols="12" md="10">
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

            <customTextarea
              v-model='form.description'
              :v="$v.form.description"
            />
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
import customInput from '~/components/customFormElements/customInput'
import customTextarea from '~/components/customFormElements/customTextarea'

export default {
  name: 'CreateGiveaway',
  components: { customInput, customTextarea },
  layout: '2columns',
  middleware: 'auth',

  data() {
    return {
      form: {
        giveawayName: '',
        description: ''
      }
    }
  },

  validations: {
    form: {
      giveawayName: {
        required,
        minLength: minLength(3),
      },
      description: {
        required: false,
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
