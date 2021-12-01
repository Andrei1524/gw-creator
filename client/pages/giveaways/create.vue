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
              :name="'description'"
              :label="'description:'"
              :label-for="'description'"
              :v="$v.form.description"
            />

            <!-- FAST/NORMAL OPTION -->
            <customOptionPicker
              v-model='form.gw_type'
              :default_option='form.gw_type'
              :title="'giveaway type:'"
              :name="'gw_type'"
              @choose_option="chooseOption"
              :option1="'fast'"
              :option2="'normal'"
            />
            <div class="info-box">
              <h5>* fast: giveaway duration is between 10 min. and 24 hours</h5>
              <h5>
                * normal: you can schedule your giveaway duration between dates
              </h5>
            </div>
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
        description: '',
        gw_type: 'fast'
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

    chooseOption(option) {
      this._data.form[option.name] = option.option;
    },
  }
}
</script>
