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
              v-model='form.giveaway_name'
              :name="'giveaway_name'"
              :label="'Giveaway name:'"
              :label-for="'giveaway_name'"
              :type="'text'"
              :placeholder="'enter a name'"
              :v="$v.form.giveaway_name"
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
              :option1="'fast'"
              :option2="'normal'"
              @choose_option="chooseOption"
            />
            <div class="info-box">
              <h5>* fast: giveaway duration is between 10 min. and 24 hours</h5>
              <h5>
                * normal: you can schedule your giveaway duration between dates
              </h5>
            </div>

            <!-- PICK WINNER METHOD MANUAL/AUTOMATIC -->
            <customOptionPicker
              v-model='form.pick_winner_method'
              :default_option='form.pick_winner_method'
              :title="'pick winner method:'"
              :name="'pick_winner_method'"
              :option1="'automatic'"
              :option2="'manual'"
              @choose_option="chooseOption"
            />
            <div class="info-box">
              <h5>* manual: draw winners manually whenever you want (randomly)</h5>
              <h5>
                * automatic: the winners will draw automatic when the time will run
                out (randomly)
              </h5>
            </div>

            <b-row>
              <b-col>
                <custom-input
                  v-model='form.nr_of_participants'
                  :name="'nr_of_participants'"
                  :label="'nr. of participants:'"
                  :label-for="'nr_of_participants'"
                  :type="'number'"
                  :placeholder="'enter nr. of participants'"
                  :v="$v.form.nr_of_participants"
                  :required="true"
                />
              </b-col>
              <b-col>
                <custom-input
                  v-model='form.nr_of_winners'
                  :name="'nr_of_winners'"
                  :label="'nr. of winners:'"
                  :label-for="'nr_of_winners'"
                  :type="'number'"
                  :placeholder="'enter a nr. of winners'"
                  :v="$v.form.nr_of_winners"
                  :required="true"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <custom-input
                  v-model='computedDuration'
                  :name="'duration'"
                  :label="'duration:'"
                  :label-for="'duration'"
                  :type="'number'"
                  :placeholder="'ex: 0.3h / 3h'"
                  :v="$v.form.duration"
                  :required="true"
                />
              </b-col>
              <b-col align-self="center">
                <span>{{ convertDuration }}</span>
              </b-col>
            </b-row>

            <!-- PUBLIC/PRIVATE -->
            <customOptionPicker
              v-model='form.available'
              :default_option='form.available'
              :title="'giveaway is:'"
              :name="'available'"
              :option1="'public'"
              :option2="'private'"
              @choose_option="chooseOption"
            />
            <div class="info-box">
              <h5>
                * public: will be visible on the front page, you can provide a
                password or make the user find it on your product page or youtube
                link or leave it open for everyone ( useful for promoting your
                product, organisation, youtube channel, etc. )
              </h5>
              <h5>
                * private: will not be shown on the front page, users can enter
                only by the link
              </h5>
            </div>

            <b-button class='custom-btn' :class="{ 'btn-error': $v.$error }" type="submit" variant="primary" @click='onSubmit'>
              <b-spinner v-show='loading' small type="grow"></b-spinner>
              <b-icon
                icon="gift"
                aria-hidden="true"
                style="width: 20px; height: 20px;"
              ></b-icon>
              Create
            </b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import formatDuration from 'date-fns/formatDuration'
import { mapActions, mapMutations } from 'vuex'
import { decimal, integer, minLength, required } from 'vuelidate/lib/validators'
import customInput from '~/components/customFormElements/customInput'
import customTextarea from '~/components/customFormElements/customTextarea'

export default {
  name: 'CreateGiveaway',
  components: { customInput, customTextarea },
  layout: 'SplitLayout',
  middleware: 'auth',

  data() {
    return {
      form: {
        giveaway_name: '',
        description: '',
        gw_type: 'fast',
        pick_winner_method: 'automatic',
        nr_of_participants: '50',
        nr_of_winners: '1',
        duration: '0.1',
        available: 'public'
      },

      loading: false
    }
  },

  validations: {
    form: {
      giveaway_name: {
        required,
        minLength: minLength(3),
      },
      description: {
        required: false,
      },
      nr_of_participants: {
        required,
        minLength: minLength(1),
        integer
      },
      nr_of_winners: {
        required,
        minLength: minLength(1),
        integer
      },
      duration: {
        required,
        decimal,
        minGiveawayDuration: (value) => value >= 0.1,
      },
    },
  },

  computed: {
    convertDuration() {
    let totalSeconds = this.form.duration * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

      return formatDuration({
        hours,
        minutes
      })
    },

    computedDuration: {
      get() {
        return this.form.duration
      },
      set: _.debounce(function(newValue) {
        this.form.duration = (Math.ceil(newValue/0.05)*0.05).toFixed(2)
      }, 700)
    }
  },

  mounted() {
    // TODO: refactor method into utils maybe
    this.setComponentToShow('share-giveaway')
  },

  methods: {
    ...mapMutations({
      setComponentToShow: 'setComponentToShow'
    }),

    ...mapActions('modules/giveaways', [
      'createGiveaway'
    ]),

    chooseOption(option) {
      this._data.form[option.name] = option.option;
    },

    onSubmit(event) {
      event.preventDefault()
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;
      this.loading = true

      const params = { ...this.form }
      // await this.login(params)
      this.createGiveaway(params).then(() => {
        console.log('created giveaway')
      })
      this.loading = false
    }
  }
}
</script>
