<template>
  <div class="pdv-tela">
    <Navbar title="ConsultaPedidos"/>
    <div class="pdv-frame mx-4">
      <div class="row mb-2">
        <div class="col">
          <span class="fw-bold title">Consulta de Pedidos</span>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="row">
            <span class="fw-bold subtitle">Filtros</span>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Pedido</span>
              <input autocomplete="off" id="inputNumPed" class="form-control input-sale" type="text" v-on:keyup.enter="searchPedidos" v-model="numPed" :disabled="!pedidos">
              <button id="btnClearPed" :disabled="numPed === ''" class="btn btn-secondary input-group-btn disable-on-search" @click="clearPedido"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaPedidos" class="btn-busca" data-bs-toggle="modal" data-bs-target="#pedidosModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Status</span>
              <select :disabled="!pedidos" class="form-select disable-on-search" v-model="situacao" id="selectTipDesc">
                <option selected value="TODOS">Todos</option>
                <option value="ABERTO">Abertos</option>
                <option value="FECHADO">Fechados</option>
              </select>
            </div>
          </div>
        </div>  
        <div class="col-3">
          <div class="row">
            <span class="fw-bold subtitle">Pedidos</span>
          </div>
        </div>  
        <div class="col">
          <div class="row">
            <span class="fw-bold subtitle">Detalhes</span>
          </div>
        </div>  
      </div>
    </div>
  </div>

  <!-- Modal Pedidos -->
  <div class="modal fade" id="pedidosModal" tabindex="-1" aria-labelledby="pedidosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pedidosModalLabel">Pedidos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalPedidos"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="pedidos != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputPedidosFiltro" v-on:keydown="navegarModalPedidos"
                v-on:keyup="filtrarModalPedidos" v-model="pedidosFiltro" placeholder="Digite para buscar o pedido abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 35%;">Número</th>
                  <th class="sm-header" scope="col" style="width: 35%;">Data de Emissão</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in pedidosFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectPedido(row)">
                  <th :id="'tabPed' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm" scope="row">{{ row.numPed }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.datEmi }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexPed}" class="fw-normal sm">{{ row.staPed }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Pedidos ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
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
  data () {
    return {
      // filtro pedidos
      pedidos: null,
      pedidosFiltrados: null,
      pedidosFiltro: '',
      numPed: '',
      tableIndexPed: 0,

      // filtros
      situacao: 'TODOS',
      dataDe: '',
      dataAte: '',
      codCli: '',
      codRep: '',

      // resultados
      pedidosResult: null,
      pedido: null
    }
  },

  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }

    this.initPedidos()
  },

  methods: {
    async initPedidos() {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      await api.getPedidos('TODOS', 'DESC')
      .then((response) => {
        this.pedidos = response.data
        this.pedidosFiltrados = this.pedidos
      })
      .catch((err) => {
        console.log(err)
        this.handleRequestError(err)
      })
      .finally(() => {
        document.getElementsByTagName('body')[0].style.cursor = 'auto'
      })
    },

    // Manipulação tela
    populateTabIndex(list) {
      let index = 0
      list.forEach(item => {
        item.tabIndex = index
        index++
      })
    },

    scrollToElement(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    },

    clearFocus() {
      document.activeElement.blur()
    },

    clearAllFilters() {
      this.numPed = ''
      this.situacao = 'TODOS'
    },

    // Filtro pedido
    searchPedidos() {
      const pedido = this.pedidos.find(ped => ped.numPed === this.numPed)
      if (pedido) this.selectPedido(pedido)
      else {
        this.pedidosFiltro = this.numPed
        document.getElementById('btnBuscaPedidos').click()
        const modalElement = document.getElementById('pedidosModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('inputPedidosFiltro').focus()
        })
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.focusPedido()
        })
      }
    },

    focusPedido() {
      this.numPed === '' ? document.getElementById('inputNumPed').focus() : document.getElementById('btnClearPed').focus()
    },

    clearPedido() {
      this.numPed = ''
    },

    filtrarModalPedidos(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarPedidos(this.pedidosFiltro)
    },

    filtrarPedidos(filter) {
      this.pedidosFiltrados = filter !== '' ? this.pedidos.filter(ped => (ped.numPed.startsWith(filter))) : this.pedidos
      this.tableIndexPed = 0

      this.populateTabIndex(this.pedidosFiltrados)
    },

    navegarModalPedidos (key) {
      if (key.keyCode === 38) this.focusTablePed(-1)
      else if (key.keyCode === 40) this.focusTablePed(1)
      else if (key.keyCode === 13) this.pedListHit()
    },

    focusTablePed(value) {
      this.tableIndexPed += value
      if (this.tableIndexPed < 0) 
        this.tableIndexPed = 0
      else if (this.tableIndexPed >= this.pedidosFiltrados.length)
        this.tableIndexPed = (this.pedidosFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexPed > 0)
        elementToScroll = document.getElementById('tabPed' + this.tableIndexPed)
      else 
        elementToScroll = document.getElementById('inputPedidosFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    pedListHit() {
      const ped = this.pedidosFiltrados.find(pedFil => pedFil.tabIndex === this.tableIndexPed)
      this.selectPedido(ped)
    },

    selectPedido(row) {
      this.numPed = row.numPed
      document.getElementById('closeModalPedidos').click()
      this.clearFocus()
    },


    // Erros
    handleRequestError(err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert('Seu token de acesso não é mais válido. Por favor, faça login novamente.')
          document.getElementById('linkLogout').click()
        }
      }
    }
  }
  
}

</script>

<style scoped src="../styles/general.css"></style>