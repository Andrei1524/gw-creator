<template>
  <div>
    <Alert />
    <Header />
    <main>
      <div class='container mt-4' fluid>
        <b-row align-h="between">
          <b-col cols="12" md="8">
            <Nuxt />
          </b-col>
          <b-col cols="12" md="4" align-h="center">
            <ShareGiveaway v-if="componentToShow === 'share-giveaway'" />
          </b-col>
        </b-row>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/_shared/Header'
import Alert from '@/components/_shared/Alert'

import ShareGiveaway from '@/components/_shared/ShareGiveaway'

export default {
  components: { Header, Alert, ShareGiveaway },

  computed: {
    ...mapState(['componentToShow']),
  },

  data() {
    return {}
  },
}
</script>
