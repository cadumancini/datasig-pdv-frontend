<template>
  <div class="pdv-tela">
    <Navbar title="ConsultaMovimentos"/>
    <div class="pdv-frame mx-4">
      <div class="row mb-2">
        <div class="col">
          <span class="fw-bold title">Consulta de Movimentação de Caixa</span>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col-5">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Data</span>
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
          <div class="float-end">
            <button id="btnBuscar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="buscar">Buscar</button>
            <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar">Limpar</button>
          </div>
        </div>
      </div>
      <div class="row table-registros border">
        <table class="table table-striped table-hover table-sm table-responsive table-items">
          <thead>
            <tr>
              <th class="sm-header" style="width: 7%;"><small>Transação</small></th>
              <th class="sm-header" style="width: 9%;"><small>Data</small></th>
              <th class="sm-header" style="width: 7%;"><small>Déb./Créd.</small></th>
              <th class="sm-header" style="width: 50%;"><small>Histórico</small></th>
              <th class="sm-header" style="width: 7%;"><small>Num. Caixa</small></th>
              <th class="sm-header" style="width: 7%;"><small>Seq. Mov.</small></th>
              <th class="sm-header" style="width: 13%;"><small>Valor (R$)</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in movimentos">
              <th class="fw-normal sm">{{ row.codTns }}</th>
              <th class="fw-normal sm">{{ row.datMov }}</th>
              <th class="fw-normal sm">{{ row.debCre }}</th>
              <th class="fw-normal sm">{{ row.hisMov }}</th>
              <th class="fw-normal sm">{{ row.numCxa }}</th>
              <th class="fw-normal sm">{{ row.seqMov }}</th>
              <th class="fw-normal sm">{{ toMoneyString(row.vlrMov) }}</th>
            </tr>
          </tbody>
        </table>
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
  name: 'ConsultaMovimentos',
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
      datIni: '',
      datFim: '',
      datClick: '',

      // registros
      movimentos: null,

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

    clearDate(date) {
      if(date === 'ini') this.datIni = ''
      else this.datFim = ''
    },

    clearFocus() {
      document.activeElement.blur()
    },

    limpar() {
      this.movimentos = null
      this.setEverythingDisabled(false)
      this.limparCampos()
      this.initDates()
    },

    limparCampos() {
      this.datIni = ''
      this.datFim = ''
    },

    toMoneyString(value) {
      return shared.toMoneyString(value)
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },

    async buscar() {
      this.movimentos = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const filterDatIni = this.datIni !== '' ? this.datIni.toLocaleDateString('pt-BR') : null
      const filterDatFim = this.datFim !== '' ? this.datFim.toLocaleDateString('pt-BR') : null
      await api.getMovimentosCaixa(filterDatIni, filterDatFim)
      .then((response) => {
        this.movimentos = response.data
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>