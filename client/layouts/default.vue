<template>
  <div>
    <Alert />
    <Header />
    <main>
      <b-container class='container mt-3' fluid>
        <b-row align-h="between">
          <b-col cols="12" md="8">
            <Nuxt />
          </b-col>
          <b-col cols="12" md="4" align-h="center">
            <ShareGiveaway v-if="componentToShow === 'share-giveaway'" />
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/_shared/Header'
import Alert from '@/components/_shared/Alert'

export default {
  name: 'Default',
  components: {Header, Alert},

  data() {
    return {}
  },

  computed: {
    ...mapState(['componentToShow']),
  },
}
</script>
