<template>
  <nav class="navbar navbar-expand-md navbar-light mb-1" style="background-color: #dedede;">
    <a class="navbar-brand logo" href="#"><img alt="Logo DataSIG" width="20%" height="20%" src="../assets/logo.png"></a>
    <ul class="navbar-nav ms-auto actions">
      <li class="nav-item mx-2 my-auto" v-if="paramsPDV">
        <small class="row"><i>Empresa: {{ paramsPDV.codEmp }}</i></small>
        <small class="row"><i>Filial: {{ paramsPDV.codFil }}</i></small>
      </li>
      <li class="nav-item mx-2 my-auto" v-if="paramsPDV">
        <small class="row"><i>Usuário: {{ paramsPDV.nomUsu }}</i></small>
        <small class="row"><i>{{ paramsPDV.base }}</i></small>
      </li>
      <li class="nav-item mx-2 my-auto">
        <a class="nav-link" href="#" :class="{ disable: this.title === 'Menu'}" @click="goBack">Voltar</a>
      </li>
      <li class="nav-item mx-2 my-auto">
        <a class="nav-link" href="#" id="linkLogout" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import api from '../utils/api'

export default {
  name: 'Navbar',
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
          nomUsu: response.data.parametrosPDV.nomUsu,
          base: process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção' 
        }
        sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  methods: {
    logout () {
      api.logout()
      sessionStorage.setItem('form', 'login')
      this.removeAll()
      this.$router.push({ name: 'Login' })
    },
    goBack () {
      sessionStorage.setItem('form', 'menu')
      this.$router.go(-1)
    },
    removeAll() {
      sessionStorage.clear()
    }
  },
  props: {
    title: String
  }
}
</script>

<style scoped>
  .logo {
    padding-left: 4px;
  }

  .disable {
    pointer-events: none;
    color: #dedede;
  }

  @media (max-width: 450px) {
    .logo {
      display: none;
    }
  }
  .actions {
    flex-direction: row !important;
  }
</style>