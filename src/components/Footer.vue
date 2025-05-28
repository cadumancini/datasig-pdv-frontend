<template>
  <div class="row footer mx-auto">
    <div class="col-8 align-self-center" v-if="paramsPDV">
      <div class="row">
        <small class="col-auto ssm">Empresa: {{ paramsPDV.codEmp }} - {{ paramsPDV.nomEmp }}</small>
        <small class="col-auto ssm">Filial: {{ paramsPDV.codFil }} - {{ paramsPDV.nomFil }}</small>
      </div>
    </div>
    <div class="col align-self-center" v-if="paramsPDV">
      <div class="float-end">
        <div class="row">
          <small class="col">{{ paramsPDV.base }} - Usuário: {{ paramsPDV.nomUsu }} - IP: {{ paramsPDV.codIp }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../utils/api'

export default {
  name: 'Footer',
  data () {
    return {
      paramsPDV: null,
    }
  },
  mounted () {
    if (sessionStorage.getItem('paramsPDV')) {
      this.paramsPDV = JSON.parse(sessionStorage.getItem('paramsPDV'))
      this.paramsPDV.base = process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção'  
    } else if (sessionStorage.getItem('token')) {
      api.getUserParams()
      .then((response) => {
        this.paramsPDV = {
          codTpr: response.data.parametrosPDV.codTpr,
          dscTot: response.data.parametrosPDV.dscTot,
          depositos: response.data.parametrosPDV.depositos,
          ramos: response.data.parametrosPDV.ramos,
          depPad: response.data.parametrosPDV.codDep,
          codEmp: response.data.parametrosPDV.codEmp,
          codFil: response.data.parametrosPDV.codFil,
          nomEmp: response.data.parametrosPDV.nomEmp,
          nomFil: response.data.parametrosPDV.nomFil,
          nomUsu: response.data.parametrosPDV.nomUsu,
          codIp: response.data.parametrosPDV.codIp,
          indImp: response.data.parametrosPDV.indImp,
          qtdImp: response.data.parametrosPDV.qtdImp,
          base: process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção' 
        }
        sessionStorage.setItem('paramsPDV', JSON.stringify(this.paramsPDV))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>