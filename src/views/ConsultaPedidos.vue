<template>
  <div class="pdv-tela">
    <Navbar title="ConsultaPedidos"/>
    <div class="pdv-frame mx-4">
      <div class="row mb-2">
        <div class="col">
          <span class="fw-bold title">Consulta de Pedidos</span>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Pedido</span>
            <input autocomplete="off" id="inputNumPed" class="form-control disable-on-search" type="text" v-model="numPed">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Tipo</span>
            <select class="form-select disable-on-search" v-model="tipo">
              <option selected value="TODOS">Todos</option>
              <option value="ORÇAMENTO">Orçamento</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Status</span>
            <select class="form-select disable-on-search" v-model="situacao">
              <option selected value="TODOS">Todos</option>
              <option value="ABERTOS">Abertos</option>
              <option value="FECHADOS">Fechados</option>
              <option value="CANCELADOS">Cancelados</option>
            </select>
          </div>
        </div>
        <div class="col-5">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Emissão</span>
            <input class="form-control" type="text" disabled :value="datIni ? datIni.toLocaleDateString('pt-BR') : ''">
            <button class="btn btn-secondary input-group-btn disable-on-search" @click="selectDate('ini')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
            <button id="btnClearIni" class="btn btn-secondary input-group-btn disable-on-search" @click="clearDate('ini')"><font-awesome-icon icon="fa-circle-xmark"/></button>
            <span class="input-group-text">até</span>
            <input class="form-control" type="text" disabled :value="datFim ? datFim.toLocaleDateString('pt-BR') : ''">
            <button class="btn btn-secondary input-group-btn disable-on-search" @click="selectDate('fim')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
            <button id="btnClearIni" class="btn btn-secondary input-group-btn disable-on-search" @click="clearDate('fim')"><font-awesome-icon icon="fa-circle-xmark"/></button>
          </div>
        </div>
        <div class="col">
          <button id="btnBuscar" class="btn btn-sm btn-secondary disable-on-search" @click="buscarPedidos"><font-awesome-icon icon="fa-search"/></button>
          <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar"><font-awesome-icon icon="fa-circle-xmark"/></button>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col">
          <div class="row">
            <div class="table-consulta-pedidos border">
              <table class="table table-striped table-hover table-sm table-responsive table-items">
                <thead>
                  <tr>
                    <th class="sm-header" style="width: 10%;"><small>Empresa</small></th>
                    <th class="sm-header" style="width: 10%;"><small>Filial</small></th>
                    <th class="sm-header" style="width: 15%;"><small>Pedido</small></th>
                    <th class="sm-header" style="width: 15%;"><small>Emissão</small></th>
                    <th class="sm-header" style="width: 15%;"><small>Tipo</small></th>
                    <th class="sm-header" style="width: 15%;"><small>Status</small></th>
                    <th class="sm-header" style="width: 20%;"><small>Ação</small></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in pedidos" :key="row.numPed" @click="selectPedido(row)">
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.codEmp }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.codFil }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.numPed }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.datEmi }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.tipPed }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.staPed }}</th>
                    <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">
                      <button :id="'btnCancelarPedido' + row.numPed" :disabled="row.staPed === 'CANCELADO'"
                          @click="confirmCancelarPedido(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">Cancelar</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row" v-if="pedidos && pedidos.length">
              <div class="col">
                <div class="float-end"><small class="fw-bold mx-2">Valor total: {{ calcValorTotalPedidos() }}</small></div>
                <div class="float-end"><small class="fw-bold mx-4">Qtd. pedidos: {{ pedidos.length }}</small></div>
              </div>
            </div>
        </div>
        <div class="col-7">
          <div class="row">
            <span class="fw-bold subtitle">Detalhes</span>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Pedido</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedNumPed">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Emissão</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedDatEmi">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Representante</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedNomRep">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cliente</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedNomCli">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Status</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedStaPed">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Qtde. Itens</span>
                <input disabled class="form-control" type="text" v-model="pedidoSelectedQtdIte">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <span class="fw-bold">Itens</span>
            <div class="row">
              <div class="col table-consulta-itens border mx-2">
                <table class="table table-striped table-hover table-sm table-responsive table-items">
                  <thead>
                    <tr>
                      <th class="sm-header" style="width: 5%;"><small>Seq</small></th>
                      <th class="sm-header" style="width: 10%;"><small>Produto</small></th>
                      <th class="sm-header" style="width: 5%;"><small>Der.</small></th>
                      <th class="sm-header" style="width: 50%;"><small>Descrição</small></th>
                      <th class="sm-header" style="width: 10%;"><small>Qtde.</small></th>
                      <th class="sm-header" style="width: 10%;"><small>Valor Uni</small></th>
                      <th class="sm-header" style="width: 10%;"><small>Valor Total</small></th>
                    </tr>
                  </thead>
                  <tbody v-if="pedidoSelected">
                    <tr v-for="row in pedidoSelected.itens">
                      <th class="fw-normal sm">{{ row.seqIpd }}</th>
                      <th class="fw-normal sm">{{ row.codPro }}</th>
                      <th class="fw-normal sm">{{ row.codDer }}</th>
                      <th class="fw-normal sm">{{ row.cplIpd }}</th>
                      <th class="fw-normal sm">{{ convertToNumber(row.qtdPed) }}</th>
                      <th class="fw-normal sm">{{ convertPreUni(row.preUni) }}</th>
                      <th class="fw-normal sm">{{ calcValorTotal(row) }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row" v-if="pedidoSelected">
              <div class="col">
                <div class="float-end"><small class="fw-bold mx-2">Valor total: {{ calcValorPedido() }}</small></div>
                <div class="float-end"><small class="fw-bold mx-4">Qtd. total: {{ calcQtdTotal() }}</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button id="btnConfirmCancelarPedido" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaCancelarModal">.</button>

  <!-- Modal Confirma Cancelamento -->
  <div class="modal fade" id="confirmaCancelarModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirma cancelameto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaCancelar"></button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja cancelar o pedido {{ this.pedidoSelected ? this.pedidoSelected.numPed : '' }}?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelarPedido(this.pedidoSelected.numPed, this.pedidoSelected.sitPed)">Sim</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal DatePicker -->
  <div class="modal fade" id="datePickerModal" tabindex="-1" aria-labelledby="datePickerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="datePickerModalLabel">Selecione uma data</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalDatePicker"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 d-flex justify-content-center">
            <DatePicker v-if="datClick === 'ini'" v-model="datIniPicked" mode="date" locale="br"/>
            <DatePicker v-else-if="datClick === 'fim'" v-model="datFimPicked" mode="date" locale="br"/>
          </div>
          <div class="container">
            <div class="row">
              <div class="col text-center">
                <button type="button" class="btn btn-secondary btn-sm" @click="selectToday(datClick)" data-bs-dismiss="modal">Hoje</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import api from '../utils/api'
import shared from '../utils/sharedFunctions'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default {
  name: 'ConsultaPedidos',
  components: { Navbar, Footer, DatePicker },
  computed: {
    datIniPicked: {
      get() {
        return this.datIni
      },
      set(v) {
        this.datIni = v
        document.getElementById('closeModalDatePicker').click()
      }
    },
    datFimPicked: {
      get() {
        return this.datFim
      },
      set(v) {
        this.datFim = v
        document.getElementById('closeModalDatePicker').click()
      }
    }
  },
  data () {
    return {
      // filtros
      numPed: '',
      situacao: 'TODOS',
      tipo: 'TODOS',
      datIni: '',
      datFim: '',
      datClick: '',

      // registros
      pedidos: null,
      pedidoSelected: null,
      pedidoSelectedNumPed: '',
      pedidoSelectedDatEmi: '',
      pedidoSelectedNomRep: '',
      pedidoSelectedNomCli: '',
      pedidoSelectedStaPed: '',
      pedidoSelectedQtdIte: '',

      // geral
      options: {
        reverse: false
      },
    }
  },

  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      this.initDates()
    }
  },

  methods: {
    initDates() {
      this.datIniPicked = new Date()
      this.datFimPicked = new Date()
    },

    selectDate(model) {
      this.datClick = model
    },

    clearDate(date) {
      if(date === 'ini') this.datIni = ''
      else this.datFim = ''
    },

    selectToday() {
      if (this.datClick === 'ini') this.datIniPicked = new Date()
      else this.datFimPicked = new Date()
    },

    clearFocus() {
      document.activeElement.blur()
    },

    limpar() {
      this.pedidos = null
      this.pedidoSelected = null
      this.setEverythingDisabled(false)
      this.limparCampos()
      this.initDates()
    },

    limparCampos() {
      this.numPed = ''
      this.situacao = 'TODOS'
      this.tipo = 'TODOS'
      this.datIni = ''
      this.datFim = ''
      this.pedidoSelected = null
      this.pedidoSelectedNumPed = ''
      this.pedidoSelectedDatEmi = ''
      this.pedidoSelectedStaPed = ''
      this.pedidoSelectedQtdIte = ''
      this.pedidoSelectedNomRep = ''
      this.pedidoSelectedNomCli = ''
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value

      if (value === false && this.pedidos) {
        this.pedidos.forEach(pedido => {
          if(pedido.staPed === 'CANCELADO') document.getElementById('btnCancelarPedido' + pedido.numPed).disabled = true
        });
      }
    },

    async buscarPedidos() {
      this.pedidos = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const filterNumPed = this.numPed !== '' ? this.numPed : null
      const filterSituacao = this.situacao !== '' ? this.situacao : null
      const filterTipo = this.tipo !== '' ? this.tipo : null
      const filterDatIni = this.datIni !== '' ? this.datIni.toLocaleDateString('pt-BR') : null
      const filterDatFim = this.datFim !== '' ? this.datFim.toLocaleDateString('pt-BR') : null
      await api.getPedidos(filterTipo, filterSituacao, filterNumPed, filterDatIni, filterDatFim, 'DESC')
      .then((response) => {
        this.pedidos = response.data
        if (!this.pedidos.length) {
          alert('Nenhum pedido encontrado!')
        }
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    confirmCancelarPedido(row) {
      this.pedidoSelected = row
      document.getElementById('btnConfirmCancelarPedido').click()
    },

    async selectPedido(row) {
      this.pedidoSelected = row
      this.pedidoSelectedNumPed = row.numPed
      this.pedidoSelectedDatEmi = row.datEmi
      this.pedidoSelectedStaPed = row.staPed
      this.pedidoSelectedQtdIte = row.itens.length

      const representante = await this.loadRepresentante(row.codRep)
      this.pedidoSelectedNomRep = representante.nomRep
      const cliente = await this.loadCliente(row.codCli)
      this.pedidoSelectedNomCli = cliente.nomCli
    },

    async loadRepresentante(codRep) {      
      await api.getRepresentantes()
        if (!sessionStorage.getItem('representantes')) {
          await api.getRepresentantes()
            .then((response) => {
              const representantes = response.data
              sessionStorage.setItem('representantes', JSON.stringify(representantes))
              return representantes.find(rep => rep.codRep === codRep)
            })
            .catch((err) => {
              console.log(err)
              shared.handleRequestError(err)
            })
        } else {
          const representantes = JSON.parse(sessionStorage.getItem('representantes'))
          return representantes.find(rep => rep.codRep === codRep)
        }
    },

    async loadCliente(codCli) {
      if (!sessionStorage.getItem('clientes')) {
        await api.getClientesSimplified()
          .then((response) => {
            const clientes = response.data
            sessionStorage.setItem('clientes', JSON.stringify(clientes))
            return clientes.find(cli => cli.codCli === codCli)
          })
          .catch((err) => {
            console.log(err)
            shared.handleRequestError(err)
          })
      } else {
        const clientes = JSON.parse(sessionStorage.getItem('clientes'))
        return clientes.find(cli => cli.codCli === codCli)
      }
    },

    async cancelarPedido(numPed, sitPed) {
      document.getElementById('closeModalConfirmaCancelar').click()
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'

      await api.cancelarPedido(numPed, sitPed)
        .then((response) => {
          const respostaPedido = response.data
          alert('Pedido ' + respostaPedido.numPed + ' cancelado com sucesso.')
          this.updatePedidoCancelado(numPed)
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })

      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    updatePedidoCancelado(numPed) {
      const pedido = this.pedidos.find(ped => ped.numPed === numPed)
      if (pedido) {
        pedido.staPed = 'CANCELADO'
        pedido.sitPed = '5'
      }
    },

    convertToNumber(value) {
      return Number(value.replace('.','').replace(',','.'))
    },

    calcValorTotal(row) {
      const preUni = this.convertToNumber(row.preUni)
      const qtdPed = this.convertToNumber(row.qtdPed)
      return shared.toMoneyString(preUni * qtdPed)
    },

    calcValorPedido() {
      let vlrTotal = 0
      this.pedidoSelected.itens.forEach(item => {
        const preUni = this.convertToNumber(item.preUni)
        const qtdPed = this.convertToNumber(item.qtdPed)
        vlrTotal += (preUni * qtdPed)
      })
      return shared.toMoneyString(vlrTotal)
    },

    calcQtdTotal() {
      return Number(this.pedidoSelected.itens.map(item => this.convertToNumber(item.qtdPed)).reduce((prev, curr) => prev + curr, 0))
    },

    calcValorTotalPedidos() {
      let vlrTotal = 0
      this.pedidos.forEach(pedido => {
        pedido.itens.forEach(item => {
          const preUni = this.convertToNumber(item.preUni)
          const qtdPed = this.convertToNumber(item.qtdPed)
          vlrTotal += (preUni * qtdPed)
        })
      })
      return shared.toMoneyString(vlrTotal)
    },

    convertPreUni(value) {
      const preUni = this.convertToNumber(value)
      return shared.toMoneyString(preUni)
    }
  }
  
}

</script>

<style scoped src="../styles/general.css"></style>