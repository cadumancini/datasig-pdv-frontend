<template>
  <div class="pdv-tela">
    <Navbar title="ConsultaNotas"/>
    <div class="pdv-frame mx-4">
      <div class="row mb-2">
        <div class="col">
          <span class="fw-bold title">Consulta de Notas</span>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Nota</span>
            <input autocomplete="off" id="inputNumNfv" class="form-control disable-on-search" v-model="numNfv">
          </div>
        </div>
        <div class="col-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Situação</span>
            <select class="form-select disable-on-search" v-model="situacao">
              <option selected value="">Todos</option>
              <option selected value="1">Digitada</option>
              <option selected value="2">Fechada</option>
              <option selected value="3">Cancelada</option>
              <option selected value="4">Documento Fiscal Emitido (saída)</option>
              <option selected value="5">Aguardando Fechamento (pós-saída)</option>
            </select>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Sit. Doc. Eletr.</span>
            <select class="form-select disable-on-search" v-model="situacaoDocEle">
              <option selected value="">Todos</option>
              <option selected value="1">Não Enviada</option>
              <option selected value="2">Enviada</option>
              <option selected value="3">Autorizada</option>
              <option selected value="4">Rejeitada</option>
              <option selected value="5">Denegada</option>
              <option selected value="6">Solicitado Inutilização</option>
              <option selected value="7">Solicitado Cancelamento</option>
              <option selected value="8">Inutilizada</option>
              <option selected value="9">Cancelada</option>
              <option selected value="10">Erro Geração</option>
              <option selected value="11">Erro Solicitação Cancelamento</option>
              <option selected value="12">Erro Solicitação Inutilização</option>
              <option selected value="13">Pendente de Cancelamento</option>
              <option selected value="14">Solicitado Encerramento (MDF-e)</option>
              <option selected value="15">Encerrado (MDF-e)</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="float-end">
            <button id="btnBuscar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="buscarNotas">Buscar</button>
            <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar">Limpar</button>
          </div>
        </div>
      </div>
      <div class="row margin-y-fields">
        <div class="col-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Representante</span>
            <input autocomplete="off" id="inputIdeRep" class="form-control input-sale disable-on-search" type="text" v-on:keyup.enter="searchRepresentantes" v-model="ideRep"
              :disabled="!this.representantes.length || this.codRep !== ''" :placeholder="!this.representantes.length ? 'Buscando representantes ...' : ''" :class="{searching: !this.representantes.length}">
            <button id="btnSearchRep" :disabled="this.codRep !== ''" class="btn btn-secondary input-group-btn disable-on-search" @click="searchRepresentantes"><font-awesome-icon icon="fa-search"/></button>
            <button id="btnClearRep" :disabled="this.codRep === ''" class="btn btn-secondary input-group-btn disable-on-search" @click="beginRepresentante"><font-awesome-icon icon="fa-circle-xmark"/></button>
            <button id="btnBuscaRepresentantes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
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
      </div>
      <div class="row table-registros border">
        <table class="table table-striped table-hover table-sm table-responsive table-items">
          <thead class="header-fixed">
            <tr>
              <th class="sm-header" style="width: 5%;"><small>Empresa</small></th>
              <th class="sm-header" style="width: 4%;"><small>Filial</small></th>
              <th class="sm-header" style="width: 11%;"><small>Emissão</small></th>
              <th class="sm-header" style="width: 4%;"><small>Série</small></th>
              <th class="sm-header" style="width: 4%;"><small>Nota</small></th>
              <th class="sm-header" style="width: 10%;"><small>Representante</small></th>
              <th class="sm-header" style="width: 15%;"><small>Cliente</small></th>
              <th class="sm-header" style="width: 7%;"><small>Valor</small></th>
              <th class="sm-header" style="width: 8%;"><small>Sit. Nota</small></th>
              <th class="sm-header" style="width: 9%;"><small>Sit. Doc. Eletr.</small></th>
              <th class="sm-header" style="width: 23%;"><small>Ação</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in notas" :key="row.codSnf + row.numNfv">
              <th class="fw-normal sm">{{ row.codEmp }}</th>
              <th class="fw-normal sm">{{ row.codFil }}</th>
              <th class="fw-normal sm">{{ row.datEmi }} - {{ row.horEmi }}</th>
              <th class="fw-normal sm">{{ row.codSnf }}</th>
              <th class="fw-normal sm">{{ row.numNfv }}</th>
              <th class="fw-normal sm">{{ row.codRep }} - {{ row.nomRep }}</th>
              <th class="fw-normal sm">{{ row.codCli }} - {{ row.nomCli }}</th>
              <th class="fw-normal sm">{{ toMoneyString(row.vlrLiq) }}</th>
              <th class="fw-normal sm">{{ row.desSitNfv }}</th>
              <th class="fw-normal sm">{{ row.desSitDoe }}</th>
              <th class="fw-normal sm">
                <button :id="'btnCancelarNota' + row.codSnf + row.numNfv" :disabled="row.cancelavel === false" @click="confirmCancelarNota(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">Cancelar</button>
                <button :id="'btnInutilizarNota' + row.codSnf + row.numNfv" :disabled="row.inutilizavel === false" @click="confirmInutilizarNota(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">Inutilizar</button>
                <button :id="'btnConsultaEDocs' + row.codSnf + row.numNfv" @click="consultarEDocs(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">eDocs</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row mt-2" v-if="notas && notas.length > 0">
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Total Vendas</span>
            <input disabled class="form-control" v-model="totalVendas">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Itens Vendidos</span>
            <input disabled class="form-control" v-model="itensVendidos">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Autorizado</span>
            <input disabled class="form-control" :value="toMoneyString(totalAutorizado)">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Canc./Inu.</span>
            <input disabled class="form-control" :value="toMoneyString(totalCanInu)">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Outros</span>
            <input disabled class="form-control" :value="toMoneyString(totalOutros)">
          </div>
        </div>
      </div>
    </div>
  </div>
  <button id="btnConfirmCancelarNota" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaCancelarModal">.</button>
  <button id="btnConfirmInutilizarNota" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaInutilizarModal">.</button>

  <!-- Modal Confirma Cancelamento -->
  <div class="modal fade" id="confirmaCancelarModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirma cancelameto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaCancelar"></button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja cancelar a nota número {{ this.notaSelected ? this.notaSelected.numNfv : '' }}? Se sim, favor informar o motivo abaixo (mín. 15 caracteres):</p>
          <textarea class="form-control" maxlength="255" v-model="jusCan" rows="5"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelarNota(this.notaSelected)" :disabled="jusCan.length < 15">Sim</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Confirma Inutilização -->
  <div class="modal fade" id="confirmaInutilizarModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirma inutilização</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaInutilizar"></button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja inutilizar a nota número {{ this.notaSelected ? this.notaSelected.numNfv : '' }}? Se sim, favor informar o motivo abaixo (mín. 15 caracteres):</p>
          <textarea class="form-control" maxlength="255" v-model="jusInu" rows="5"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="inutilizarNota(this.notaSelected)" :disabled="jusInu.length < 15">Sim</button>
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
  name: 'ConsultaNotas',
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
      numNfv: '',
      situacao: '',
      situacaoDocEle: '',
      datIni: '',
      datFim: '',
      datClick: '',

      // representantes
      ideRep: '',
      codRep: '',
      representantes: [],
      representantesFiltro: '',
      representantesFiltrados: [],
      tableIndexRep: 0,

      // registros
      notas: null,
      notaSelected: null,
      jusCan: '',
      jusInu: '',
      totalVendas: 0,
      itensVendidos: 0,
      totalAutorizado: 0,
      totalCanInu: 0,
      totalOutros: 0,

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

    this.initRepresentantes() 
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
      this.notas = null
      this.setEverythingDisabled(false)
      this.limparCampos()
      this.initDates()
    },

    limparCampos() {
      this.numNfv = ''
      this.situacao = ''
      this.situacaoDocEle = ''
      this.ideRep = ''
      this.codRep = ''
      this.representantesFiltro = ''
      this.datIni = ''
      this.datFim = ''
      this.jusCan = ''
      this.jusInu = ''
      this.totalVendas = 0
      this.itensVendidos = 0
      this.totalAutorizado = 0
      this.totalCanInu = 0
      this.totalOutros = 0
      this.limparCamposJustificativa()
    },

    toMoneyString(value) {
      return shared.toMoneyString(value)
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value

      if (value === false && this.notas) {
        this.notas.forEach(nota => {
          if(!nota.cancelavel) document.getElementById('btnCancelarNota' + nota.codSnf + nota.numNfv).disabled = true
          if(!nota.inutilizavel) document.getElementById('btnInutilizarNota' + nota.codSnf + nota.numNfv).disabled = true
        });
      }
    },

    async buscarNotas() {
      this.notas = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const filterNumNfv = this.numNfv !== '' ? this.numNfv : null
      const filterSituacao = this.situacao !== '' ? this.situacao : null
      const filterSituacaoDocEle = this.situacaoDocEle !== '' ? this.situacaoDocEle : null
      const filterDatIni = this.datIni !== '' ? this.datIni.toLocaleDateString('pt-BR') : null
      const filterDatFim = this.datFim !== '' ? this.datFim.toLocaleDateString('pt-BR') : null
      const filterCodRep = this.codRep !== '' ? this.codRep : null
      await api.getNotas(filterNumNfv, filterSituacao, filterSituacaoDocEle, filterDatIni, filterDatFim, filterCodRep)
      .then((response) => {
        this.notas = response.data
        this.calcResumo()
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })
      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    calcResumo() {
      this.totalVendas = this.notas.length
      this.itensVendidos = Number(this.notas.map(item => item.qtdFat).reduce((prev, curr) => prev + curr, 0))
      this.totalAutorizado = Number(this.notas.filter(item => Number(item.sitDoe) === 3).map(item => item.vlrLiq).reduce((prev, curr) => prev + curr, 0))
      this.totalCanInu = Number(this.notas.filter(item => [5,8,9].includes(Number(item.sitDoe))).map(item => item.vlrLiq).reduce((prev, curr) => prev + curr, 0))
      this.totalOutros = Number(this.notas.filter(item => ![3,5,8,9].includes(Number(item.sitDoe))).map(item => item.vlrLiq).reduce((prev, curr) => prev + curr, 0))
    },

    confirmCancelarNota(row) {
      this.notaSelected = row
      this.limparCamposJustificativa()
      document.getElementById('btnConfirmCancelarNota').click()
    },

    confirmInutilizarNota(row) {
      this.notaSelected = row
      this.limparCamposJustificativa()
      document.getElementById('btnConfirmInutilizarNota').click()
    },

    limparCamposJustificativa() {
      this.jusCan = ''
      this.jusInu = ''
    },

    async cancelarNota(nota) {
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

    async inutilizarNota(nota) {
      document.getElementById('closeModalConfirmaInutilizar').click()
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'

      await api.inutilizarNFCe(nota.codSnf, nota.numNfv, this.jusInu)
      .then((response) => {
        const resposta = response.data
        if(resposta !== 'OK') {
          alert(resposta)
        } else {
          alert('NFC-e ' + nota.numNfv + ' inutilizada com sucesso. Favor recarregar a busca para atualizar os valores.')
          this.limpar()
        } 
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })

      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    async consultarEDocs(nota) {
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'

      await api.consultarEDocs(nota.codSnf, nota.numNfv)
      .then((response) => {
        alert(response.data.response)
        const index = this.notas.findIndex(notaFound => notaFound.numNfv === response.data.notaFiscal.numNfv)
        this.notas[index] = response.data.notaFiscal
      })
      .catch((err) => {
        console.log(err)
        shared.handleRequestError(err)
      })

      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    },

    /* Representantes */
    async initRepresentantes() {
      if (!sessionStorage.getItem('representantes')) {
        await api.getRepresentantes()
        .then((response) => {
          this.representantes = response.data
          this.representantesFiltrados = this.representantes
          sessionStorage.setItem('representantes', JSON.stringify(this.representantes))
        })
        .catch((err) => {
          console.log(err)
          shared.handleRequestError(err)
        })
      } else {
        this.representantes = JSON.parse(sessionStorage.getItem('representantes'))
        this.representantesFiltrados = this.representantes
      }
    },

    async beginRepresentante() {
      this.ideRep = ''
      this.codRep = ''
      this.representantesFiltro = ''

      if(!this.representantes.length) await this.initRepresentantes()
    },

    searchRepresentantes() {  
      this.filtrarRepresentantes(this.ideRep)
      if (this.representantesFiltrados.length === 1 && this.ideRep !== '') { // encontramos, selecionar
        this.selectRepresentante(this.representantesFiltrados[0])
      } else { // nao encontramos, abrir modal
        this.openRepresentantesModal()
      }
    },

    async selectRepresentante(row) {
      this.ideRep = row.nomRep
      this.codRep = row.codRep
      document.getElementById('closeModalRepresentantes').click()
    },

    filtrarRepresentantes(filter) {
      this.representantesFiltrados = this.representantes.filter(rep => (rep.codRep === filter ||
                  rep.nomRep.toUpperCase().includes(filter.toUpperCase()) ||
                  rep.apeRep.toUpperCase().includes(filter.toUpperCase())))
      this.tableIndexRep = 0

      shared.populateTabIndex(this.representantesFiltrados)
    },

    openRepresentantesModal() {
      this.representantesFiltro = this.ideRep
      document.getElementById('btnBuscaRepresentantes').click()
      const modalElement = document.getElementById('representantesModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputRepresentantesFiltro').focus()
      })
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.focusRepresentante()
      })
    },

    focusRepresentante() {
      this.codRep === '' ? document.getElementById('inputIdeRep').focus() : document.getElementById('btnClearRep').focus()
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
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>