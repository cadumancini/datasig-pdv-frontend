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
        <div class="col">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Situação</span>
            <select class="form-select disable-on-search" v-model="situacao" id="selectTipDesc">
              <option selected value="">Todos</option>
              <option selected value="1">Digitada</option>
              <option selected value="2">Fechada</option>
              <option selected value="3">Cancelada</option>
              <option selected value="4">Documento Fiscal Emitido (saída)</option>
              <option selected value="5">Aguardando Fechamento (pós-saída)</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Data de Emissão</span>
            <vue-mask class="form-control disable-on-search" mask="00/00/0000" :raw="false" :options="options" v-model="datIni"></vue-mask>
            <span class="input-group-text">até</span>
            <vue-mask class="form-control disable-on-search" mask="00/00/0000" :raw="false" :options="options" v-model="datFim"></vue-mask>
          </div>
        </div>
        <div class="col-1">
          <div class="input-group input-group-sm">
            <button id="btnBuscar" class="btn btn-secondary mx-2 disable-on-search" @click="buscarNotas">Buscar</button>
          </div>
        </div>
      </div>
      <div class="row table-nfce border">
        <table class="table table-striped table-hover table-sm table-responsive table-items">
          <thead style="position: sticky; top: 0;">
            <tr>
              <th class="sm-header" style="width: 8%;"><small>Empresa</small></th>
              <th class="sm-header" style="width: 8%;"><small>Filial</small></th>
              <th class="sm-header" style="width: 8%;"><small>Nota</small></th>
              <th class="sm-header" style="width: 8%;"><small>Série</small></th>
              <th class="sm-header" style="width: 8%;"><small>Cliente</small></th>
              <th class="sm-header" style="width: 8%;"><small>Representante</small></th>
              <th class="sm-header" style="width: 22%;"><small>Emissão</small></th>
              <th class="sm-header" style="width: 15%;"><small>Sit. Nota</small></th>
              <th class="sm-header" style="width: 15%;"><small>Sit. Doc. Eletr.</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in notas" :key="row.codSnf + row.numNfv">
              <th class="fw-normal sm">{{ row.codEmp }}</th>
              <th class="fw-normal sm">{{ row.codFil }}</th>
              <th class="fw-normal sm">{{ row.numNfv }}</th>
              <th class="fw-normal sm">{{ row.codSnf }}</th>
              <th class="fw-normal sm">{{ row.codCli }}</th>
              <th class="fw-normal sm">{{ row.codRep }}</th>
              <th class="fw-normal sm">{{ row.datEmi }} - {{ row.horEmi }}</th>
              <th class="fw-normal sm">{{ row.desSitNfv }}</th>
              <th class="fw-normal sm">{{ row.desSitDoe }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import api from '../utils/api'
import vueMask from 'vue-jquery-mask'

export default {
  name: 'ConsultaNotas',
  components: { Navbar, vueMask },
  data () {
    return {
      // filtros
      numNfv: '',
      situacao: '',
      datIni: '',
      datFim: '',

      // registros
      notas: null,

      // geral
      options: {
        reverse: false
      },
    }
  },

  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }
  },

  methods: {
    clearFocus() {
      document.activeElement.blur()
    },

    handleRequestError(err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert('Seu token de acesso não é mais válido. Por favor, faça login novamente.')
          document.getElementById('linkLogout').click()
        }
        else if (err.response.status === 404) {
          alert('Nenhum registro encontrado.')
          this.clearFocus()
        }
      }
    },

    setEverythingDisabled(value) {
      const elements = document.getElementsByClassName('disable-on-search')
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },

    async buscarNotas() {
      this.notas = null
      this.setEverythingDisabled(true)
      const filterNumNfv = this.numNfv !== '' ? this.numNfv : null
      const filterSituacao = this.situacao !== '' ? this.situacao : null
      const filterDatIni = this.datIni !== '' ? this.datIni : null
      const filterDatFim = this.datFim !== '' ? this.datFim : null
      await api.getNotas(filterNumNfv, filterSituacao, filterDatIni, filterDatFim)
      .then((response) => {
        this.notas = response.data
      })
      .catch((err) => {
        console.log(err)
        this.handleRequestError(err)
      })
      this.setEverythingDisabled(false)
      document.getElementsByTagName('body')[0].style.cursor = 'auto'
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>