<template>
  <div class='homepage'>
    <SponsoredCompetitions />
  </div>
</template>

<script>
import SponsoredCompetitions from '~/components/homepage/SponsoredCompetitions'
export default {
  name: 'Homepage',
  components: { SponsoredCompetitions },
  layout: 'SplitLayout'
}
</script>
