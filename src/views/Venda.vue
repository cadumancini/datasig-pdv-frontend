<template>
  <div class="venda-tela">
    <Navbar title="Venda"/>
    <div class="venda mx-4">
      <span class="fw-bold fs-1">Relizar Venda</span>
      <div class="row">
        <div class="col-4">
          <span class="fw-bold fs-5">Identificação</span>
          <div class="row my-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Representante</span>
              <input class="form-control" type="text" disabled v-model="ideRep">
              <button id="btnBuscaRepresentantes" class="btn btn-secondary input-group-btn btn-busca" @click="buscaRepresentantes" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
            </div>
          </div>
          <div class="row my-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Cliente</span>
              <input class="form-control" type="text" disabled v-model="ideCli">
              <button id="btnBuscaClientes" class="btn btn-secondary input-group-btn btn-busca" @click="buscaClientes" data-bs-toggle="modal" data-bs-target="#clientesModal">...</button>
            </div>
          </div>
        </div>
        <div class="col-8">
          <span class="fw-bold fs-5">Produtos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'

export default {
  name: 'Venda',
  components: { Navbar },
  data () {
    return {
      // api
      api_url: '',
      token: '',

      // representantes
      ideRep: '',
      codRep: '',
      representantes: null,
      representantesFiltro: '',
      representantesFiltrados: '',
      
      //clientes
      ideCli: '',
      codCli: '',
      clientes: '',
      clientesFiltro: '',
      clientesFiltrados: '',
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }

    this.initRepresentantes()    
  },
  methods: {
    initRepresentantes() {
      if (!sessionStorage.getItem('representantes')) {
        api.getRepresentantes(this.api_url, this.token)
        .then((response) => {
          this.representantes = response.data
          sessionStorage.setItem('representantes', JSON.stringify(representantes))
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.representantes = JSON.parse(sessionStorage.getItem('representantes'))
      }
    }
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
  .venda {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 80%;
  }
  .input-group-btn {
    width: 40px !important;
  }
  .btn-busca {
    width: 1.75rem !important;
  }

</style>