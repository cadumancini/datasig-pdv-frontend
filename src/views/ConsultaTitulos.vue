<template>
  <div class="pdv-tela">
    <Navbar title="ConsultaTitulos"/>
    <div class="pdv-frame mx-4">
      <div class="row mb-2">
        <div class="col">
          <span class="fw-bold title">Consulta de Títulos</span>
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
            <span class="input-group-text">Situação Título</span>
            <select class="form-select disable-on-search" v-model="situacao">
              <option selected value="AO">Aberto ao Órgão de Proteção ao Crédito</option>
              <option selected value="AN">Aberto Negociação</option>
              <option selected value="AA">Aberto Advogado</option>
              <option selected value="AB">Aberto Normal</option>
              <option selected value="AC">Aberto Cartório</option>
              <option selected value="AE">Aberto Encontro de Contas</option>
              <option selected value="AI">Aberto Impostos</option>
              <option selected value="AJ">Aberto Retorno Jurídico</option>
              <option selected value="AP">Aberto Protestado</option>
              <option selected value="AR">Aberto Representante</option>
              <option selected value="AS">Aberto Suspenso</option>
              <option selected value="AV">Aberto Gestão de Pessoas</option>
              <option selected value="AX">Aberto Externo</option>
              <option selected value="CA">Cancelado</option>
              <option selected value="CE">Aberto CE (Preparação Cobrança Escritural)</option>
              <option selected value="CO">Aberto Cobrança</option>
              <option selected value="LQ">Liquidado Normal</option>
              <option selected value="LC">Liquidado Cartório</option>
              <option selected value="LI">Liquidado Impostos</option>
              <option selected value="LM">Liquidado Compensado</option>
              <option selected value="LO">Liquidado Cobrança</option>
              <option selected value="LP">Liquidado Protestado</option>
              <option selected value="LS">Liquidado Substituído</option>
              <option selected value="LV">Liquidado Gestão de Pessoas</option>
              <option selected value="LX">Liquidado Externo</option>
              <option selected value="PE">Aberto PE (Pagamento Eletrônico)</option>
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
          <div class="input-group input-group-sm">
            <span class="input-group-text">Representante</span>
            <input autocomplete="off" id="inputIdeRep" class="form-control input-sale disable-on-search" type="text" v-on:keyup.enter="searchRepresentantes" v-model="ideRep"
              :disabled="!this.representantes.length || this.codRep !== ''" :placeholder="!this.representantes.length ? 'Buscando representantes ...' : ''" :class="{searching: !this.representantes.length}">
            <button id="btnSearchRep" :disabled="this.codRep !== ''" class="btn btn-secondary input-group-btn disable-on-search" @click="searchRepresentantes"><font-awesome-icon icon="fa-search"/></button>
            <button id="btnClearRep" :disabled="this.codRep === ''" class="btn btn-secondary input-group-btn disable-on-search" @click="beginRepresentante"><font-awesome-icon icon="fa-circle-xmark"/></button>
            <button id="btnBuscaRepresentantes" class="btn-busca" data-bs-toggle="modal" data-bs-target="#representantesModal">...</button>
          </div>
        </div>
      </div>
      <div class="row margin-y-fields">
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
        <div class="col-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Forma de Pagto</span>
            <select class="form-select disable-on-search" :disabled="!formasPagto.length" v-model="codFpg">
              <option selected value="">Todas</option>
              <option v-for="forma in formasPagto" :key="forma.codFpg" :value="forma.codFpg">{{ forma.desFpg }}</option>
            </select>
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Usuário</span>
            <input autocomplete="off" id="inputNomUsu" class="form-control disable-on-search" v-model="nomUsu">
          </div>
        </div>
        <div class="col">
          <div class="float-end">
            <button id="btnBuscar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="buscar">Buscar</button>
            <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar">Limpar</button>
          </div>
        </div>
      </div>
      <div class="row table-registros-titulos border">
        <table class="table table-striped table-hover table-sm table-responsive table-items">
          <thead class="header-fixed">
            <tr>
              <th class="sm-header" style="width: 5%;"><small>Emissão</small></th>
              <th class="sm-header" style="width: 3%;"><small>Tipo</small></th>
              <th class="sm-header" style="width: 4%;"><small>Título</small></th>
              <th class="sm-header" style="width: 8%;"><small>Sit. Título</small></th>
              <th class="sm-header" style="width: 3%;"><small>Série</small></th>
              <th class="sm-header" style="width: 3%;"><small>Nota</small></th>
              <th class="sm-header" style="width: 6%;"><small>Sit. Nota</small></th>
              <th class="sm-header" style="width: 8%;"><small>Sit. Doc. Eletr.</small></th>
              <th class="sm-header" style="width: 21%;"><small>Cliente</small></th>
              <th class="sm-header" style="width: 13%;"><small>Representante</small></th>
              <th class="sm-header" style="width: 9%;"><small>Forma Pagto.</small></th>
              <th class="sm-header" style="width: 5%;"><small>Usuário</small></th>
              <th class="sm-header" style="width: 6%;"><small>Vlr. Original</small></th>
              <th class="sm-header" style="width: 6%;"><small>Vlr. Aberto</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in titulos" :key="row.numTit">
              <th class="fw-normal ssm">{{ row.datEmi }}</th>
              <th class="fw-normal ssm">{{ row.codTpt }}</th>
              <th class="fw-normal ssm">{{ row.numTit }}</th>
              <th class="fw-normal ssm">{{ row.desSitTit }}</th>
              <th class="fw-normal ssm">{{ row.codSnf }}</th>
              <th class="fw-normal ssm">{{ row.numNfv }}</th>
              <th class="fw-normal ssm">{{ row.desSitNfv }}</th>
              <th class="fw-normal ssm">{{ row.desSitDoe }}</th>
              <th class="fw-normal ssm">{{ row.codCli }} - {{ row.nomCli }}</th>
              <th class="fw-normal ssm">{{ row.codRep }} - {{ row.nomRep }}</th>
              <th class="fw-normal ssm">{{ row.desFpg }}</th>
              <th class="fw-normal ssm">{{ row.nomUsu }}</th>
              <th class="fw-normal ssm">{{ toMoneyString(row.vlrOri) }}</th>
              <th class="fw-normal ssm">{{ toMoneyString(row.vlrAbe) }}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row" v-if="titulos && titulos.length > 0">
        <div class="col-2">
          <div class="input-group input-group-sm mt-2">
            <span class="input-group-text sm">Total Vendas</span>
            <input disabled class="form-control" v-model="totalVendas">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm mt-2">
            <span class="input-group-text sm">Total Títulos</span>
            <input disabled class="form-control" v-model="totalTiulos">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm mt-2">
            <span class="input-group-text sm">Vlr. em Aberto</span>
            <input disabled class="form-control" :value="toMoneyString(totalAberto)">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group input-group-sm mt-2">
            <span class="input-group-text sm">Vlr. Original</span>
            <input disabled class="form-control" :value="toMoneyString(totalOriginal)">
          </div>
        </div>
      </div>
      <div class="row" v-if="titulos && titulos.length > 0">
        <div class="row"><span class="fw-bold sm mt-2">Totais por Formas de Pagamento</span></div>
        <div class="row">
          <div class="col-3" v-for="pagto in new Set(this.titulos.map(tit => tit.desFpg))">
            <div class="input-group input-group-sm mt-2">
              <span class="input-group-text ssm">{{ pagto }}</span>
              <input disabled class="form-control" :value="toMoneyString(calcTotal(pagto))">
            </div>
          </div>
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
  name: 'ConsultaTitulos',
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
      nomUsu: '',

      // representantes
      ideRep: '',
      codRep: '',
      representantes: [],
      representantesFiltro: '',
      representantesFiltrados: [],
      tableIndexRep: 0,

      // registros
      titulos: null,
      totalVendas: 0,
      totalTiulos: 0,
      totalAberto: 0,
      totalOriginal: 0,

      // geral
      options: {
        reverse: false
      },      
      
      // formas de pagto
      codFpg: '',
      formasPagto: [],
    }
  },

  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    } else {
      this.initDates()
    }

    this.initRepresentantes() 
    this.initFormasPagto() 
    this.nomUsu = shared.getNomUsu()
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
      this.titulos = null
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
      this.ideFpg = ''
      this.codFpg = ''
      this.representantesFiltro = ''
      this.datIni = ''
      this.datFim = ''
      this.totalVendas = 0
      this.totalTiulos = 0
      this.totalAberto = 0
      this.totalOriginal = 0
      this.nomUsu = shared.getNomUsu()
    },

    toMoneyString(value) {
      return shared.toMoneyString(value)
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },

    async buscar() {
      this.titulos = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      const filterNumNfv = this.numNfv !== '' ? this.numNfv : null
      const filterSituacao = this.situacao !== '' ? this.situacao : null
      const filterSituacaoDocEle = this.situacaoDocEle !== '' ? this.situacaoDocEle : null
      const filterDatIni = this.datIni !== '' ? this.datIni.toLocaleDateString('pt-BR') : null
      const filterDatFim = this.datFim !== '' ? this.datFim.toLocaleDateString('pt-BR') : null
      const filterCodRep = this.codRep !== '' ? this.codRep : null
      const filterCodFpg = this.codFpg !== '' ? this.codFpg : null
      const filterNomUsu = this.nomUsu !== '' ? this.nomUsu : null
      await api.getTitulos(filterNumNfv, filterSituacao, filterSituacaoDocEle, filterDatIni, filterDatFim, filterCodRep, filterCodFpg, filterNomUsu)
      .then((response) => {
        this.titulos = response.data
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
      this.totalTiulos = this.titulos.length
      this.totalVendas = new Set(this.titulos.map(tit => tit.numNfv)).size
      this.totalAberto = Number(this.titulos.map(tit => tit.vlrAbe).reduce((prev, curr) => prev + curr, 0))
      this.totalOriginal = Number(this.titulos.map(tit => tit.vlrOri).reduce((prev, curr) => prev + curr, 0))
    },

    calcTotal(pagto) {
      return Number(this.titulos.filter(tit => tit.desFpg === pagto).map(tit => tit.vlrOri).reduce((prev, curr) => prev + curr, 0))
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
    },

    /* Formas de Pagamento */
    async initFormasPagto() {
      if (!sessionStorage.getItem('formasPagto')) {
        await api.getFormasPagto()
        .then((response) => {
          this.formasPagto = response.data
          sessionStorage.setItem('formasPagto', JSON.stringify(this.formasPagto))
        })
        .catch((err) => {
          shared.handleRequestError(err)
          console.log(err)
        })
      } else {
        this.formasPagto = JSON.parse(sessionStorage.getItem('formasPagto'))
      }
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>