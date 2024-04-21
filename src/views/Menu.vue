<template>
  <div class="menu-tela">
    <Navbar title="Menu"/>
    <div class="menu">
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Operações de Caixa</span>
        <button disabled class="btn btn-secondary btn-menu mx-4">Abertura</button>
        <button disabled class="btn btn-secondary btn-menu mx-4">Fechamento</button>
      </div>
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Operações de Venda</span>
        <button class="btn btn-secondary btn-menu mx-4" @click="access('Venda')">Realizar Venda (V)</button>
        <button disabled class="btn btn-secondary btn-menu mx-4" @click="access('ConsultaPedidos')">Consultar Pedidos</button>
      </div>
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Consultas</span>
        <button class="btn btn-secondary btn-menu mx-4" @click="access('ConsultaNotas')">Notas Fiscais (N)</button>
        <button disabled class="btn btn-secondary btn-menu mx-4">Produtos</button>
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
  created () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }    
  },
  mounted () {
    if(sessionStorage.getItem('form') === 'menu') {
      this.populateRepresentantes()
      this.populateClientes()
      this.populateCondicoesPagto()
      this.populateFormasPagto()
      this.populateParams()

      this.addEvents()
    }
  },
  methods: {
    addEvents() {
      let self = this
      window.addEventListener('keyup', function(ev) {
          self.handleOption(ev)
      });
    },

    handleOption(event) {
      if (sessionStorage.getItem('form', 'menu')) {
        if(event.key.toUpperCase() === 'V') this.access('Venda')
        else if(event.key.toUpperCase() === 'N') this.access('ConsultaNotas')
        // if(event.key.toUpperCase() === 'L') this.access('ConsultaPedidos')
      }
    },

    access (form) {
      this.$router.push({ name: form })
      sessionStorage.setItem('form', form)
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

    populateCondicoesPagto () {
      api.getCondicoesPagto()
      .then((response) => {
        sessionStorage.setItem('condicoesPagto', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },

    populateFormasPagto () {
      api.getFormasPagto()
      .then((response) => {
        sessionStorage.setItem('formasPagto', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    populateParams () {
      api.getUserParams()
      .then((response) => {
        const paramsPDV = {
          usaTEF: response.data.usaTEF,
          codTpr: response.data.parametrosPDV.codTpr
        }
        sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
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
    height:10rem;
    width:10rem;
    cursor:pointer;
  }
  .margin-b {
    margin-bottom: 1.5rem !important;
  }
  .section {
    font-size: 2.5rem !important;
  }

  @media (max-width: 450px) {
    .btn-menu {
      height:7rem;
      width:7rem;
    }
  }

  @media (max-height: 768px) {
    .btn-menu {
      height:7rem;
      width:9rem;
    }
    .margin-b {
      margin-bottom: 0.5rem !important;
    }
    .section {
      font-size: 1.7rem !important;
    }
  }

</style>