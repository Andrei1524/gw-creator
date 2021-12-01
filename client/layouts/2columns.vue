<template>
  <div>
    <Alert />
    <Header />
    <main>
      <div class="2columns container">
        <div class="first-col">
          <Nuxt />
        </div>
        <div class="second-col">
          <ShareGiveaway v-if='componentToShow === "share-giveaway"' />
        </div>
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
    ...mapState(['componentToShow'])
  },

  data() {
    return {}
  },
}
</script>
