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
        <div class="col-2">
          <button id="btnBuscar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="buscarNotas">Buscar</button>
          <button id="btnLimpar" class="btn btn-sm btn-secondary mx-2 disable-on-search" @click="limpar">Limpar</button>
        </div>
      </div>
      <div class="row table-nfce border">
        <table class="table table-striped table-hover table-sm table-responsive table-items">
          <thead style="position: sticky; top: 0;">
            <tr>
              <th class="sm-header" style="width: 7%;"><small>Empresa</small></th>
              <th class="sm-header" style="width: 7%;"><small>Filial</small></th>
              <th class="sm-header" style="width: 7%;"><small>Nota</small></th>
              <th class="sm-header" style="width: 7%;"><small>Série</small></th>
              <th class="sm-header" style="width: 7%;"><small>Cliente</small></th>
              <th class="sm-header" style="width: 7%;"><small>Representante</small></th>
              <th class="sm-header" style="width: 18%;"><small>Emissão</small></th>
              <th class="sm-header" style="width: 12%;"><small>Sit. Nota</small></th>
              <th class="sm-header" style="width: 12%;"><small>Sit. Doc. Eletr.</small></th>
              <th class="sm-header" style="width: 16%;"><small>Ação</small></th>
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
              <th class="fw-normal sm">
                <button @click="confirmCancelarNota(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">Cancelar</button>
                <button @click="confirmInutilizarNota(row)" class="btn btn-secondary btn-sm sm edit-nota disable-on-search">Inutilizar</button>
                <button id="btnConfirmCancelarNota" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaCancelarModal">.</button>
                <button id="btnConfirmInutilizarNota" class="btn-busca" data-bs-toggle="modal" data-bs-target="#confirmaInutilizarModal">.</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

    <!-- Modal Confirma Cancelamento -->
    <div class="modal fade" id="confirmaCancelarModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirma cancelameto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalConfirmaCancelar"></button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja cancelar a nota número {{ this.notaSelected ? this.notaSelected.numNfv : '' }}? Se sim, favor informar o motivo abaixo:</p>
          <textarea class="form-control" maxlength="255" v-model="jusCan" rows="5"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelarNota(this.notaSelected)">Sim</button>
          <button type="button" class="btn btn-dismiss" data-bs-dismiss="modal">Não</button>
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
          <p>Tem certeza que deseja inutilizar a nota número {{ this.notaSelected ? this.notaSelected.numNfv : '' }}? Se sim, favor informar o motivo abaixo:</p>
          <textarea class="form-control" maxlength="255" v-model="jusInu" rows="5"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="inutilizarNota(this.notaSelected)">Sim</button>
          <button type="button" class="btn btn-dismiss" data-bs-dismiss="modal">Não</button>
        </div>
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
      notaSelected: null,
      jusCan: '',
      jusInu: '',

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

    limpar() {
      this.notas = null
      this.setEverythingDisabled(false)
      this.limparCampos()
    },

    limparCampos() {
      this.numNfv = ''
      this.situacao = ''
      this.datIni = ''
      this.datFim = ''
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
      for (var i = 0; i < elements.length; i++) elements[i].disabled = value
    },

    async buscarNotas() {
      this.notas = null
      this.setEverythingDisabled(true)
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
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
    },

    confirmCancelarNota(row) {
      this.notaSelected = row
      document.getElementById('btnConfirmCancelarNota').click()
    },

    confirmInutilizarNota(row) {
      this.notaSelected = row
      document.getElementById('btnConfirmInutilizarNota').click()
    },

    cancelarNota(nota) {

    },

    inutilizarNota(nota) {

    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>