<template>
  <div>
    <Alert />
    <Header />
    <main>
      <b-container class='custom-container' fluid>
        <b-row no-gutters>
          <LiveWins />
          <b-col :class='{ "ml-auto" : splitLayoutSettings["isMarginLeftAuto"] }'>
            <Nuxt />
          </b-col>
          <b-col v-if="splitLayoutSettings['componentToShow'] === 'share-giveaway'"  cols='12' md='4' class='ml-auto right-comp'>
            <ShareGiveaway v-if="splitLayoutSettings['componentToShow'] === 'share-giveaway'" />
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
    ...mapState(['splitLayoutSettings']),
  },
}
</script>

<style lang='scss'>
@import './assets/css/variables';

.page-header-wrapper {
  padding: 0.5em 0.5em;

  h4 {
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

.right-comp {
  max-width: 360px;
}
</style>
