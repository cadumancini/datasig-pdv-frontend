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
            <span class="input-group-text">Status</span>
            <select class="form-select disable-on-search" v-model="situacao" id="selectTipDesc">
              <option selected value="TODOS">Todos</option>
              <option value="ABERTOS">Abertos</option>
              <option value="FECHADOS">Fechados</option>
            </select>
          </div>
        </div>
        <div class="col-5">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Data de Emissão</span>
            <input class="form-control" type="text" disabled :value="datIni ? datIni.toLocaleDateString('pt-BR') : ''">
            <button class="btn btn-secondary input-group-btn disable-on-search" @click="selectDate('ini')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
            <span class="input-group-text">até</span>
            <input class="form-control" type="text" disabled :value="datFim ? datFim.toLocaleDateString('pt-BR') : ''">
            <button class="btn btn-secondary input-group-btn disable-on-search" @click="selectDate('fim')" data-bs-toggle="modal" data-bs-target="#datePickerModal">...</button>
          </div>
        </div>
        <div class="col-2">
          <button id="btnBuscar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="buscarPedidos">Buscar</button>
          <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar">Limpar</button>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col table-registros border">
          <table class="table table-striped table-hover table-sm table-responsive table-items">
            <thead>
              <tr>
                <th class="sm-header"><small>Empresa</small></th>
                <th class="sm-header"><small>Filial</small></th>
                <th class="sm-header"><small>Pedido</small></th>
                <th class="sm-header"><small>Emissão</small></th>
                <th class="sm-header"><small>Status</small></th>
                <th class="sm-header"><small>Ação</small></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pedidos" :key="row.numPed" @click="selectPedido(row)">
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.codEmp }}</th>
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.codFil }}</th>
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.numPed }}</th>
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.datEmi }}</th>
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">{{ row.staPed }}</th>
                <th :class="{active:this.pedidoSelected && row.numPed === this.pedidoSelected.numPed}" class="fw-normal sm">
                  <button :id="'btnCancelarPedido' + row.codSnf + row.numNfv" :disabled="row.staPed === 'FECHADO'"
                      @click="confirmCancelarPedido(row)" class="btn btn-secondary btn-sm sm edit-nota">Cancelar</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-7">
          <div class="row">
            <span class="fw-bold subtitle">Detalhes</span>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Pedido</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Emissão</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Representante</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Cliente</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Status</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">Qtde. Itens</span>
                <input disabled class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <span class="fw-bold">Itens</span>
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
          <button type="button" class="btn btn-secondary" @click="cancelarPedido(this.pedidoSelected)">Sim</button>
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
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'
import shared from '../utils/sharedFunctions'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default {
  name: 'ConsultaPedidos',
  components: { Navbar, DatePicker },
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
      datIni: '',
      datFim: '',
      datClick: '',

      // registros
      pedidos: null,
      pedidoSelected: null,

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
      this.datIni = ''
      this.datFim = ''
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },

    async buscarPedidos() {
      this.pedidos = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const filterNumPed = this.numPed !== '' ? this.numPed : null
      const filterSituacao = this.situacao !== '' ? this.situacao : null
      const filterDatIni = this.datIni !== '' ? this.datIni.toLocaleDateString('pt-BR') : null
      const filterDatFim = this.datFim !== '' ? this.datFim.toLocaleDateString('pt-BR') : null
      await api.getPedidos(filterSituacao, filterNumPed, filterDatIni, filterDatFim, 'DESC')
      .then((response) => {
        this.pedidos = response.data
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

    selectPedido(row) {
      this.pedidoSelected = row

      //TODO: carregar detalhes
    },

    async cancelarPedido(pedido) {
      document.getElementById('closeModalConfirmaCancelar').click()
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'

      await api.cancelarNFCe(nota.codSnf, nota.numNfv, this.jusCan)
      .then((response) => {
        const resposta = response.data
        if(resposta !== 'OK') {
          alert(resposta)
        } else {
          alert('NFC-e ' + nota.numNfv + ' cancelada com sucesso. Favor recarregar a busca para atualizar os valores.')
          this.limpar()
        } 
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 404) {
          alert('Nenhum registro encontrado.')
          this.clearFocus()
        } else {
          shared.handleRequestError(err)
        }
      })

      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },
  }
  
}

</script>

<style scoped src="../styles/general.css"></style>