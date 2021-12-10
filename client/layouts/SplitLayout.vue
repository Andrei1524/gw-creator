<template>
  <div>
    <Alert />
    <Header />
    <main>
      <div class='page-header'>
        <div class='page-header-wrapper'>
          <div class='page-title d-flex align-content-center'>
            <b-icon
              icon="gift-fill"
              aria-hidden="true"
              style="width: 30px; height: 30px;"
            ></b-icon>
            <h3 class='ml-2'>CREATE GIVEAWAY</h3>
          </div>
        </div>
        <hr class="white-hr" />
      </div>
      <b-container class='custom-container mt-4' fluid>
        <b-row align-h="between" no-gutters>
          <b-col cols="12" md='2'>
            <LiveWins />
          </b-col>
          <b-col cols="12" md="8">
            <Nuxt />
          </b-col>
          <b-col cols="12" md="2" align-h="center">
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

import ShareGiveaway from '@/components/_shared/ShareGiveaway'
import LiveWins from '~/components/_shared/LiveWins'

export default {
  name: 'SplitLayout',
  components: { Header, Alert, ShareGiveaway, LiveWins },

  data() {
    return {}
  },

  computed: {
    ...mapState(['componentToShow']),
  },
}
</script>

<style lang='scss'>
@import './assets/css/variables';

.page-header-wrapper {
  padding: 0.5em 2em;

  h3 {
    margin: 0;
  }

  .page-title {
    .b-icon {
      color: $white;
    }
  }
}

.custom-container {
  padding: 0;
}
</style>
