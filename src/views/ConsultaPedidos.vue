<template>
  <div class="pdv-tela">
  <Navbar title="ConsultaPedidos"/>
  <div class="pdv-frame mx-4">
    <div class="row">
      <div class="col">
        <span class="fw-bold title">Consulta de Pedidos</span>
      </div>
    </div>

  </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'

export default {
  name: 'ConsultaPedidos',
  components: { Navbar },

  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }
  },
  
}

</script>

<style scoped src="../styles/general.css"></style>