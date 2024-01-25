<template>
  <div class="venda-tela">
    <Navbar title="Venda"/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Venda',
  components: { Navbar },
  data () {
    return {
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
   html, body {
    height: 100%;
  }
  .venda-tela {
    height: 100%;
  }

</style>