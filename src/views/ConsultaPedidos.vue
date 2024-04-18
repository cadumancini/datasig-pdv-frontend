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
              <input autocomplete="off" id="inputNumPed" class="form-control input-sale" type="text" v-on:keyup.enter="searchPedidos" v-model="numPed" :disabled="!pedidos"
                :placeholder="!pedidos ? 'Buscando pedidos ...' : ''">
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
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Representante</span>
              <input autocomplete="off" id="inputCodRep" class="form-control input-sale" type="text" v-on:keyup.enter="searchRepresentantes" v-model="codRep" :disabled="!representantes"
                :placeholder="!representantes ? 'Buscando representantes ...' : ''">
              <button id="btnClearRep" :disabled="codRep === ''" class="btn btn-secondary input-group-btn disable-on-search" @click="clearRepresentante"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaRepresentantes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Cliente</span>
              <input autocomplete="off" id="inputCodCli" class="form-control input-sale" type="text" v-on:keyup.enter="searchClientes" v-model="codCli" :disabled="!clientes"
                :placeholder="!clientes ? 'Buscando clientes ...' : ''">
              <button id="btnClearCli" :disabled="codCli === ''" class="btn btn-secondary input-group-btn disable-on-search" @click="clearCliente"><font-awesome-icon icon="fa-circle-xmark"/></button>
              <button id="btnBuscaClientes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#clientesModal">...</button>
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

  <!-- Modal Representantes -->
  <div class="modal fade" id="representantesModal" tabindex="-1" aria-labelledby="representantesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="representantesModalLabel">Representantes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalRepresentantes"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="representantes != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputRepresentantesFiltro" v-on:keydown="navegarModalRepresentantes" v-on:keyup="filtrarModalRepresentantes" v-model="representantesFiltro" placeholder="Digite para buscar o representante abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 20%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 40%;">Nome</th>
                  <th class="sm-header" scope="col" style="width: 40%;">Apelido</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in representantesFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectRepresentante(row)">
                  <th :id="'tabRep' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm" scope="row">{{ row.codRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm">{{ row.nomRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexRep}" class="fw-normal sm">{{ row.apeRep }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando representantes ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>  

  <!-- Modal Clientes -->
  <div class="modal fade" id="clientesModal" tabindex="-1" aria-labelledby="clientesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="clientesModalLabel">Clientes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalClientes"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="clientes != null">
            <input type="text" autocomplete="off" class="form-control mb-3" id="inputClientesFiltro" v-on:keydown="navegarModalClientes" v-on:keyup="filtrarModalClientes" v-model="clientesFiltro" placeholder="Digite para buscar o cliente abaixo">
            <table class="table table-striped table-hover table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th class="sm-header" scope="col" style="width: 10%;">Código</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Nome</th>
                  <th class="sm-header" scope="col" style="width: 30%;">Apelido</th>
                  <th class="sm-header" scope="col" style="width: 30%;">CPF/CNPJ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in clientesFiltrados" :key="row.tabIndex" class="mouseHover row-modal" @click="selectCliente(row)">
                  <th :id="'tabCli' + row.tabIndex" :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm" scope="row">{{ row.codCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.nomCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.apeCli }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndexCli}" class="fw-normal sm">{{ row.cgcCpf }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <label>Buscando Clientes ...</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" @click="habilitarCadastroCliente">Novo</button>
          <button type="button" id="btnCadastrarNovoCliente" class="btn-busca" data-bs-toggle="modal" data-bs-target="#cadastroClientesModal">Novo</button>
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

      // filtro situacao
      situacao: 'TODOS',

      // filtro representantes
      representantes: null,
      representantesFiltrados: null,
      representantesFiltro: '',
      codRep: '',
      tableIndexRep: 0,

      // filtro clientes
      clientes: null,
      clientesFiltrados: null,
      clientesFiltro: '',
      codCli: '',
      tableIndexCli: 0,

      // filtros
      dataDe: '',
      dataAte: '',

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
    this.initRepresentantes()
    this.initClientes()
  },

  methods: {
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
    async initPedidos() {
      await api.getPedidos('TODOS', 'DESC')
      .then((response) => {
        this.pedidos = response.data
        this.pedidosFiltrados = this.pedidos
      })
      .catch((err) => {
        console.log(err)
        this.handleRequestError(err)
      })
    },

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

    navegarModalPedidos(key) {
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

    // Filtro representante
    async initRepresentantes() {
      await api.getRepresentantes()
      .then((response) => {
        this.representantes = response.data
        this.representantesFiltrados = this.representantes
      })
      .catch((err) => {
        console.log(err)
        this.handleRequestError(err)
      })
    },

    searchRepresentantes() {
      this.filtrarRepresentantes(this.codRep)
      if (this.representantesFiltrados.length === 1) this.selectRepresentante(this.representantesFiltrados[0])
      else {
        this.representantesFiltro = this.codRep
        document.getElementById('btnBuscaRepresentantes').click()
        const modalElement = document.getElementById('representantesModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('inputRepresentantesFiltro').focus()
        })
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.focusRepresentante()
        })
      }
    },

    focusRepresentante() {
      this.codRep === '' ? document.getElementById('inputCodRep').focus() : document.getElementById('btnClearRep').focus()
    },

    clearRepresentante() {
      this.codRep = ''
    },

    filtrarModalRepresentantes(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarRepresentantes(this.representantesFiltro)
    },

    filtrarRepresentantes(filter) {
      this.representantesFiltrados = this.representantes.filter(rep => (rep.codRep === filter ||
                  rep.nomRep.toUpperCase().includes(filter.toUpperCase()) ||
                  rep.apeRep.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexRep = 0

      this.populateTabIndex(this.representantesFiltrados)
    },

    navegarModalRepresentantes(key) {
      if (key.keyCode === 38) this.focusTableRep(-1)
      else if (key.keyCode === 40) this.focusTableRep(1)
      else if (key.keyCode === 13) this.repListHit()
    },

    focusTableRep(value) {
      this.tableIndexRep += value
      if (this.tableIndexRep < 0) 
        this.tableIndexRep = 0
      else if (this.tableIndexRep >= this.representantesFiltrados.length)
        this.tableIndexRep = (this.representantesFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexRep > 0)
        elementToScroll = document.getElementById('tabRep' + this.tableIndexRep)
      else 
        elementToScroll = document.getElementById('inputRepresentantesFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    repListHit() {
      const rep = this.representantesFiltrados.find(repFil => repFil.tabIndex === this.tableIndexRep)
      this.selectRepresentante(rep)
    },

    selectRepresentante(row) {
      this.codRep = row.codRep
      document.getElementById('closeModalRepresentantes').click()
      this.clearFocus()
    },

    // Filtro cliente
    async initClientes() {
      await api.getClientes()
      .then((response) => {
        this.clientes = response.data
        this.clientesFiltrados = this.clientes
      })
      .catch((err) => {
        console.log(err)
        this.handleRequestError(err)
      })
    },

    searchClientes() {
      this.filtrarClientes(this.codCli)
      if (this.clientesFiltrados.length === 1) this.selectCliente(this.clientesFiltrados[0])
      else {
        this.clientesFiltro = this.codCli
        document.getElementById('btnBuscaClientes').click()
        const modalElement = document.getElementById('clientesModal')
        modalElement.addEventListener('shown.bs.modal', () => {
          document.getElementById('inputClientesFiltro').focus()
        })
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.focusCliente()
        })
      }
    },

    focusCliente() {
      this.codCli === '' ? document.getElementById('inputCodCli').focus() : document.getElementById('btnClearCli').focus()
    },

    clearCliente() {
      this.codCli = ''
    },

    filtrarModalClientes(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarClientes(this.clientesFiltro)
    },

    filtrarClientes(filter) {
      this.clientesFiltrados = this.clientes.filter(cli => (cli.codCli === filter ||
                  cli.nomCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.apeCli.toUpperCase().includes(filter.toUpperCase()) ||
                  cli.cgcCpf.startsWith(filter)))
      this.tableIndexCli = 0

      this.populateTabIndex(this.clientesFiltrados)
    },

    navegarModalClientes(key) {
      if (key.keyCode === 38) this.focusTableCli(-1)
      else if (key.keyCode === 40) this.focusTableCli(1)
      else if (key.keyCode === 13) this.cliListHit()
    },

    focusTableCli(value) {
      this.tableIndexCli += value
      if (this.tableIndexCli < 0) 
        this.tableIndexCli = 0
      else if (this.tableIndexCli >= this.clientesFiltrados.length)
        this.tableIndexCli = (this.clientesFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndexCli > 0)
        elementToScroll = document.getElementById('tabCli' + this.tableIndexCli)
      else 
        elementToScroll = document.getElementById('inputClientesFiltro')
      
      this.scrollToElement(elementToScroll)
    },  

    cliListHit() {
      const cli = this.clientesFiltrados.find(cliFil => cliFil.tabIndex === this.tableIndexCli)
      this.selectCliente(cli)
    },

    selectCliente(row) {
      this.codCli = row.codCli
      document.getElementById('closeModalClientes').click()
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