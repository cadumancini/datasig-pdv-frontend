<template>
  <div class="pdv-tela">
    <Navbar title="Menu"/>
    <div class="pdv-frame">
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Operações de Caixa</span>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="startOperacao('ABERTURA')">Abertura</button>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="startOperacao('SANGRIA')">Sangria</button>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="startOperacao('FECHAMENTO')">Fechamento</button>
        <button id="btnOperacaoCaixa" class="btn-busca" data-bs-toggle="modal" data-bs-target="#operacaoCaixaModal">...</button>
      </div>
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Operações de Venda</span>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('Venda')">Realizar Venda</button>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('ConsultaPedidos')">Consultar Pedidos</button>
      </div>
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Consultas</span>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('ConsultaNotas')">Notas Fiscais</button>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('ConsultaMovimentos')">Movimentos de Caixa</button>
        <button disabled class="btn btn-secondary btn-main-menu mx-4">Produtos</button>
      </div>
    </div>
  </div>

  <!-- Modal Operação do Caixa -->
  <div class="modal fade" id="operacaoCaixaModal" tabindex="-1">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Operação de Caixa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalOperacaoCaixa"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <span>Informe o valor para realizar a operação de {{ tipoOperacao.toLowerCase() }} do caixa:</span>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <span class="input-group-text">R$</span>
                <vue-mask id="inputVlrMov" class="form-control" mask="000.000.000,00" :raw="false" :options="options" v-model="vlrMov"></vue-mask>
              </div>
            </div>
          </div>
          <div class="row margin-y-fields">
            <div class="col">
              <div class="input-group input-group-sm">
                <textarea id="inputHisMov" class="form-control" maxlength="100" v-model="hisMov" rows="5" style="text-transform:uppercase"
                placeholder="Informe o histórico da movimentação (máx. 100 caracteres)"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btnRealizarOperacaoCaixa" @click="realizarOperacaoCaixa">Confirmar</button>
          <button type="button" class="btn btn-secondary" id="btnCancelarOperacaoCaixa" data-bs-dismiss="modal">Cancelar</button>
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
import vueMask from 'vue-jquery-mask'

export default {
  name: 'Menu',
  components: { Navbar, Footer, vueMask },
  data () {
    return {
      tipoOperacao: '',
      vlrMov: '',
      hisMov: '',
      options: {
        reverse: true
      }
    }
  },
  created () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({ name: 'Login' })
    }    
  },
  mounted () {
    if(sessionStorage.getItem('form') === 'menu') {
      this.populateRepresentantes()
      this.populateClientes()
      this.populateFormasPagto()
      this.populateParams()
    }
  },
  methods: {
    access (form) {
      this.$router.push({ name: form })
      sessionStorage.setItem('form', form)
    },

    populateRepresentantes () {
      api.getRepresentantes()
      .then((response) => {
        sessionStorage.setItem('representantes', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },

    populateClientes () {
      api.getClientesSimplified()
      .then((response) => {
        sessionStorage.setItem('clientes', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },

    populateFormasPagto () {
      api.getFormasPagto()
      .then((response) => {
        sessionStorage.setItem('formasPagto', JSON.stringify(response.data))
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    populateParams () {
      if (!sessionStorage.getItem('paramsPDV')) {
        api.getUserParams()
        .then((response) => {
          const paramsPDV = {
            codTpr: response.data.parametrosPDV.codTpr,
            dscTot: response.data.parametrosPDV.dscTot,
            depositos: response.data.parametrosPDV.depositos,
            ramos: response.data.parametrosPDV.ramos,
            depPad: response.data.parametrosPDV.codDep,
            codEmp: response.data.parametrosPDV.codEmp,
            codFil: response.data.parametrosPDV.codFil,
            nomEmp: response.data.parametrosPDV.nomEmp,
            nomFil: response.data.parametrosPDV.nomFil,
            nomUsu: response.data.parametrosPDV.nomUsu
          }
          sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },

    startOperacao(operacao) {
      this.tipoOperacao = operacao
      this.vlrMov = ''
      this.hisMov = operacao + ': '

      document.getElementById('btnOperacaoCaixa').click()
      const modalElement = document.getElementById('operacaoCaixaModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputVlrMov').focus()
      })
    },

    async realizarOperacaoCaixa() {
      if (this.validarOperacaoCaixa()) {
        document.getElementById('inputVlrMov').disabled = true
        document.getElementById('inputHisMov').disabled = true
        document.getElementById('btnRealizarOperacaoCaixa').disabled = true
        document.getElementById('btnCancelarOperacaoCaixa').disabled = true
        document.getElementsByTagName('body')[0].style.cursor = 'wait'

        await api.realizarOperacaoCaixa(this.tipoOperacao, this.vlrMov, this.hisMov.toUpperCase())
          .then((response) => {
            alert('Operação realizada com sucesso.')         
            document.getElementById('closeModalOperacaoCaixa').click()
          })
          .catch((err) => {
            console.log(err)
            shared.handleRequestError(err)
            if(err.response.data) {
              document.getElementById('inputVlrMov').focus()
            }
          })
          .finally(() => {
            document.getElementsByTagName('body')[0].style.cursor = 'auto'
            document.getElementById('inputVlrMov').disabled = false
            document.getElementById('inputHisMov').disabled = false
            document.getElementById('btnRealizarOperacaoCaixa').disabled = false
            document.getElementById('btnCancelarOperacaoCaixa').disabled = false
          })
      }
    },

    validarOperacaoCaixa() {
      if (this.vlrMov === '' || Number(this.vlrMov.replace(',','.')) === 0) {
        alert('Por favor, preencha um valor.')
        document.getElementById('inputVlrMov').focus()
        return false
      } else if (this.hisMov === '') {
        alert('Por favor, preencha o texto do histórico da movimentação.')
        document.getElementById('inputHisMov').focus()
        return false
      }
      return true
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>