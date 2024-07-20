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
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('Venda')">Realizar Venda (V)</button>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('ConsultaPedidos')">Consultar Pedidos (L)</button>
      </div>
      <div class="row mx-4 margin-b">
        <span class="fw-bold section margin-b">Consultas</span>
        <button class="btn btn-secondary btn-main-menu mx-4" @click="access('ConsultaNotas')">Notas Fiscais (N)</button>
        <button disabled class="btn btn-secondary btn-main-menu mx-4">Produtos</button>
      </div>
    </div>
  </div>

  <!-- Modal Operação do Caixa -->
  <div class="modal fade" id="operacaoCaixaModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Operação de Caixa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalOperacaoCaixa"></button>
        </div>
        <div class="modal-body">
          <textarea id="inputObsItem" class="form-control" maxlength="255" v-model="obsIpd" rows="5" placeholder="Informe a observação do item"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="realizarOperacaoCaixa">Confirmar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
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
import vueMask from 'vue-jquery-mask'
export default {
  name: 'Menu',
  components: { Navbar, Footer, vueMask },
  data () {
    return {
      tipoOperacao: '',
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

      this.addEvents()
    }
  },
  methods: {
    addEvents() {
      let self = this
      window.addEventListener('keyup', function(ev) {
          self.handleOption(ev)
      });
    },

    handleOption(event) {
      if (sessionStorage.getItem('form') === 'menu') {
        if(event.key.toUpperCase() === 'V') this.access('Venda')
        if(event.key.toUpperCase() === 'L') this.access('ConsultaPedidos')
        if(event.key.toUpperCase() === 'N') this.access('ConsultaNotas')
      }
    },

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
      api.getClientes()
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

      document.getElementById('btnOperacaoCaixa').click()
      const modalElement = document.getElementById('operacaoCaixaModal')
      modalElement.addEventListener('shown.bs.modal', () => {
        document.getElementById('inputRepresentantesFiltro').focus()
      })
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>