<template>
  <div class="menu-tela">
    <Navbar title="Menu"/>
    <div class="menu">
      <div class="row mx-4 mb-4">
        <span class="fw-bold fs-1 mb-4">Operações de Caixa</span>
        <button class="btn btn-secondary btn-menu mx-4">Abertura</button>
        <button class="btn btn-secondary btn-menu mx-4">Fechamento</button>
      </div>
      <div class="row mx-4 mb-4">
        <span class="fw-bold fs-1 mb-4">Operações de Venda</span>
        <button class="btn btn-secondary btn-menu mx-4" @click="access('Venda')">Realizar Venda</button>
      </div>
      <div class="row mx-4 mb-4">
        <span class="fw-bold fs-1 mb-4">Consultas</span>
        <button class="btn btn-secondary btn-menu mx-4">Produtos</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'
export default {
  name: 'Menu',
  components: { Navbar },
  data () {
    return {
    }
  },
  created () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }    
  },
  mounted () {
    this.populateRepresentantes()
    this.populateClientes()
    this.populateProdutos()
  },
  methods: {
    access (form) {
      this.$router.push({ name: form })
    },

    populateRepresentantes () {
      api.getRepresentantes()
      .then((response) => {
        sessionStorage.setItem('representantes', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },

    populateClientes () {
      api.getClientes()
      .then((response) => {
        sessionStorage.setItem('clientes', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },

    populateProdutos () {
      api.getProdutos()
      .then((response) => {
        sessionStorage.setItem('produtos', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
   html, body {
    height: 100%;
  }
  .menu-tela {
    height: 100%;
  }
  .menu {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 80%;
  }
  .btn-sub {
    display: block;
    color: #fff;
    background-color: #93999e;
    width: 100%;
  }
  .btn-sub:hover {
    color: #fff;
    background-color: #808283;
  }
  .btn-sub:active {
    background-color: #bdbdbd !important;
    color:
     #fff !important;
  }
  .btn-menu {
    height:10em;
    width:10em;
    cursor:pointer;
  }

  @media (max-width: 450px) {
    .btn-menu {
      height:7em;
      width:7em;
    }
  }

</style>