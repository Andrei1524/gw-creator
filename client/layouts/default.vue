<template>
  <div>
    <Alert />
    <Header />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from '@/components/_shared/Header'
import Alert from '@/components/_shared/Alert'

export default {
  name: 'Default',
  components: {Header, Alert},

  data() {
    return {}
  }
}
</script>
