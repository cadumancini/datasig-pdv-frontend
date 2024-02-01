<template>
  <div class="venda-tela">
    <Navbar title="Venda"/>
    <div class="venda mx-4">
      <div class="row">
        <div class="col-2">
          <span class="fw-bold fs-1">Relizar Venda</span>
        </div>
        <div class="col-2">
          <div class="border options">
            <div class="row"><span>Opções</span></div>
            <div class="row"><span>R -> Representante</span></div>
            <div class="row"><span>C -> Cliente</span></div>
            <div class="row"><span>P -> Produto</span></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <span class="fw-bold fs-5">Identificação</span>
          <div class="row my-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Representante</span>
              <input autocomplete="off" id="inputIdeRep" class="form-control" type="text" v-on:keyup.enter="searchRepresentantes" v-model="ideRep">
              <button id="btnBuscaRepresentantes" class="btn btn-secondary input-group-btn btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
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
          <div class="row my-4">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Cód. de Barras</span>
              <input class="form-control" type="text" ref="codBar" v-model="codBar" v-on:keyup.enter="onBarcodeEnter" >
              <button id="btnBuscaProdutos" class="btn btn-secondary input-group-btn btn-busca" @click="buscaProdutos" data-bs-toggle="modal" data-bs-target="#produtosModal">...</button>
            </div>
          </div>
          <div class="row table-wrapper border">
            <table class="table table-striped table-hover table-sm table-responsive table-items">
              <thead>
                <tr>
                  <th class="sm-header" style="width: 70%;"><small>Produto</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Quantidade</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Valor Unit.</small></th>
                  <th class="sm-header" style="width: 10%;"><small>Valor Total.</small></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in itensCarrinho" :key="row.codPro + row.codDer">
                  <th class="fw-normal sm">{{ row.desPro }}</th>
                  <th class="fw-normal sm">{{ row.qtdPed }}</th> <!-- TODO: inserir input -->
                  <th class="fw-normal sm">10</th> <!-- TODO: buscar valor e usar mascara -->
                  <th class="fw-normal sm">{{ 10 * row.qtdPed }}</th> <!-- TODO: usar mascara -->
                </tr>
              </tbody>
            </table>
          </div>
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
                <tr v-for="row in representantesFiltrados" :key="row.tabIndex" class="mouseHover" @click="selectRepresentante(row)">
                  <th :id="'tabRep' + row.tabIndex"  :class="{active:row.tabIndex == this.tableIndex}" class="fw-normal sm" scope="row">{{ row.codRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndex}" class="fw-normal sm">{{ row.nomRep }}</th>
                  <th :class="{active:row.tabIndex == this.tableIndex}" class="fw-normal sm">{{ row.apeRep }}</th>
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
            <input type="text" class="form-control mb-3" v-on:keyup="filtrarClientes" v-model="clientesFiltro" placeholder="Digite para buscar o cliente abaixo">
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
                <tr v-for="row in clientesFiltrados" :key="row.codCli" class="mouseHover" @click="selectCliente(row)">
                  <th class="fw-normal sm" scope="row">{{ row.codCli }}</th>
                  <th class="fw-normal sm">{{ row.nomCli }}</th>
                  <th class="fw-normal sm">{{ row.apeCli }}</th>
                  <th class="fw-normal sm">{{ row.cgcCpf }}</th>
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
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'

export default {
  name: 'Venda',
  components: { Navbar },
  data () {
    return {
      // representantes
      ideRep: '',
      codRep: '',
      representantes: [],
      representantesFiltro: '',
      representantesFiltrados: [],
      tableIndex: 0,
      
      //clientes
      ideCli: '',
      codCli: '',
      clientes: [],
      clientesFiltro: '',
      clientesFiltrados: '',
      
      //produtos
      codBar: '',
      produtos: [],
      produtosFiltro: '',
      produtosFiltrados: '',
      itensCarrinho: []
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }

    this.initRepresentantes()    
    this.initClientes()    
    this.initProdutos()   
    
    let self = this
    window.addEventListener('keyup', function(ev) {
        self.handleOption(ev);
    });
  },
  methods: {
    async initRepresentantes() {
      if (!sessionStorage.getItem('representantes')) {
        api.getRepresentantes()
        .then((response) => {
          this.representantes = response.data
          this.representantesFiltrados = this.representantes
          sessionStorage.setItem('representantes', JSON.stringify(this.representantes))
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.representantes = JSON.parse(sessionStorage.getItem('representantes'))
        this.representantesFiltrados = this.representantes
      }
    },

    initClientes() {
      if (!sessionStorage.getItem('clientes')) {
        api.getClientes()
        .then((response) => {
          this.clientes = response.data
          this.clientesFiltrados = this.clientes
          sessionStorage.setItem('clientes', JSON.stringify(this.clientes))
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.clientes = JSON.parse(sessionStorage.getItem('clientes'))
        this.clientesFiltrados = this.clientes
      }
    },

    initProdutos() {
      if (!sessionStorage.getItem('produtos')) {
        api.getProdutos()
        .then((response) => {
          this.produtos = response.data
          sessionStorage.setItem('produtos', JSON.stringify(this.produtos))
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.produtos = JSON.parse(sessionStorage.getItem('produtos'))
      }
    },

    handleOption(key) {
      if(this.noInputIsFocused()) {
        if (key.key === 'r' || key.key === 'R') {
          this.beginRepresentante()
        }
      }
    },

    noInputIsFocused() {
      const inputs = document.getElementsByClassName('form-control')
      for(let i = 0; i < inputs.length; i++) {
        if(document.activeElement === inputs[i])
          return false
      }
      return true
    },

    beginRepresentante() {
      this.ideRep = ''
      this.representantesFiltro = ''
      document.getElementById('inputIdeRep').focus()
    },

    onBarcodeEnter() {
      const item = this.produtos.find(prod => prod.codBa2 === this.codBar)
      if (item) {
        const itemCar = this.itensCarrinho.find(itemCar => itemCar.codBa2 === item.codBa2)
        if (itemCar)
          itemCar.qtdPed += 1
        else {
          item.qtdPed = 1
          this.itensCarrinho.push(item)
        }
      } else {
        alert('Código de barras não encontrado na lista de produtos!')
      }
      this.codBar = ''
    },

    async searchRepresentantes() {
      await this.buscaRepresentantes()
      this.filtrarRepresentantes(this.ideRep)
      if (this.representantesFiltrados.length === 1) { // encontramos, selecionar
        this.selectRepresentante(this.representantesFiltrados[0])
      } else { // nao encontramos, abrir modal
        this.openRepresentantesModal()
      }
    },

    async buscaRepresentantes() {
      if(!this.representantes.length)
        await this.initRepresentantes()
    },

    selectRepresentante(row) {
      this.ideRep = row.codRep + ' - ' + row.nomRep
      this.codRep = row.codRep
      document.getElementById('closeModalRepresentantes').click()
    },

    filtrarRepresentantes(filter) {
      this.representantesFiltrados = this.representantes.filter(rep => (rep.codRep === filter ||
                  rep.nomRep.includes(filter) ||
                  rep.apeRep.includes(filter)))

      let index = 0
      this.tableIndex = 0
      this.representantesFiltrados.forEach(rep => {
        rep.tabIndex = index
        index++
      })
    },

    openRepresentantesModal() {
      this.representantesFiltro = this.ideRep
      document.getElementById('btnBuscaRepresentantes').click()
      const modalElement = document.getElementById('representantesModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputRepresentantesFiltro').focus()
      })
    },

    navegarModalRepresentantes(key) {
      if (key.keyCode === 38) this.focusTableRep(-1)
      else if (key.keyCode === 40) this.focusTableRep(1)
      else if (key.keyCode === 13) this.repListHit()
    },

    filtrarModalRepresentantes(key) {
      if(key.keyCode !== 38 && key.keyCode !== 40 && key.keyCode !== 13)
        this.filtrarRepresentantes(this.representantesFiltro)
    },

    focusTableRep(value) {
      this.tableIndex += value
      if (this.tableIndex < 0) 
        this.tableIndex = 0
      else if (this.tableIndex >= this.representantesFiltrados.length)
        this.tableIndex = (this.representantesFiltrados.length - 1)

      let elementToScroll
      if (this.tableIndex > 0)
        elementToScroll = document.getElementById('tabRep' + this.tableIndex)
      else 
        elementToScroll = document.getElementById('inputRepresentantesFiltro')
      
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    },  

    repListHit() {
      const rep = this.representantesFiltrados.find(repFil => repFil.tabIndex === this.tableIndex)
      this.selectRepresentante(rep)
    },

    buscaClientes() {
      if(!this.clientes.length)
        this.initClientes()
    },

    selectCliente(row) {
      this.ideCli = row.codCli + ' - ' + row.nomCli
      this.codCli = row.codCli
      document.getElementById('closeModalClientes').click()
    },

    filtrarClientes() {
      this.clientesFiltrados = this.clientes.filter(cli => (cli.codCli.startsWith(this.clientesFiltro) ||
                  cli.nomCli.startsWith(this.clientesFiltro) ||
                  cli.apeCli.startsWith(this.clientesFiltro) ||
                  cli.cgcCpf.startsWith(this.clientesFiltro)))
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
    display: none;
  }
  .table-wrapper {
    height: 25rem;
    width: 100%;
    margin: 0px auto 0px auto;
    overflow: auto;
  }
  .table-items {
    width: 100%;
    max-height: 1rem;
  }
  .sm {
    font-size: 0.8rem !important;
  }
  .sm-header {
    font-size: 0.9rem !important;
  }
  .active {
    background-color: rgb(166, 166, 166);
  }
  .options {
    border-radius: 10px;
    padding: 1rem;
    background-color: #dedede;
  }

</style>