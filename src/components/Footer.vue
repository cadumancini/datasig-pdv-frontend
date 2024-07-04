<template>
  <div class="row footer mx-auto">
    <div class="col-7 align-self-center" v-if="paramsPDV">
      <div class="row">
        <small class="col-auto">Empresa: {{ paramsPDV.codEmp }} - {{ paramsPDV.nomEmp }}</small>
        <small class="col-auto">Filial: {{ paramsPDV.codFil }} - {{ paramsPDV.nomFil }}</small>
      </div>
    </div>
    <div class="col align-self-center" v-if="paramsPDV">
      <div class="row">
        <small class="col">{{ paramsPDV.base }}</small>
      </div>
    </div>
    <div class="col align-self-center" v-if="paramsPDV">
      <div class="row">
        <small class="col">Usuário: {{ paramsPDV.nomUsu }}</small>
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
    } else {
      api.getUserParams()
      .then((response) => {
        this.paramsPDV = {
          codTpr: response.data.parametrosPDV.codTpr,
          dscTot: response.data.parametrosPDV.dscTot,
          depositos: response.data.parametrosPDV.depositos,
          depPad: response.data.parametrosPDV.codDep,
          codEmp: response.data.parametrosPDV.codEmp,
          codFil: response.data.parametrosPDV.codFil,
          nomEmp: response.data.parametrosPDV.nomEmp,
          nomFil: response.data.parametrosPDV.nomFil,
          nomUsu: response.data.parametrosPDV.nomUsu,
          base: process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção' 
        }
        sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped src="../styles/general.css"></style>