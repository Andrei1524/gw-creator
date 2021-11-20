<template>
  <div>
    <Header />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Header from '@/components/_shared/Header'

export default {
  components: {Header},

  data() {
    return {}
  }
}
</script>
