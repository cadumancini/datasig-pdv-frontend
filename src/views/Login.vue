<template>
  <div class="text-center login-page">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <img src="../assets/logo.png" class="mb-4" width="100%" height="100%">
      <h3 class="mb-3 font-weight-normal">Sistema PDV</h3>
      <input class="form-control" type="text" id="inputUsuario" placeholder="Usuário" required autofocus v-model="user" ref="inputUser">
      <input class="form-control" type="password" id="inputSenha" placeholder="Senha" required v-model="password">
      <button id="btnLogin" :disabled="this.user === '' || this.password === ''" class="btn btn-lg btn-block btn-secondary">Login</button>
      <h5 class="mt-3 text-danger" v-if="base !== ''"><em>{{ base }}</em></h5>
    </form>
  </div>
</template>

<script>
import api from '../utils/api'
import tef from '../utils/tef'
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: '',
      api_url: '',
      base: ''
    }
  },
  created () {
    this.api_url = process.env.VUE_APP_API_URL
    this.base = process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : ''
      // .then(() => {
      //   console.log('TEF authenticated successfully')
      // })
      // .catch((error) => {
      //   console.error('Error authenticating TEF:', error)
      //   this.base = 'Erro ao autenticar TEF'
      // })
  },
  mounted () {
    if (sessionStorage.getItem('token')) {
      sessionStorage.setItem('form', 'menu')
      this.$router.push({ name: 'Menu' })
    } else {
      sessionStorage.setItem('form', 'login')
      this.$refs.inputUser.focus()
    }
    console.log('Authenticate TEF')
    tef.authenticatePaykit('34711662000191')
  },
  methods: {
    handleSubmit () {
      document.getElementsByTagName('body')[0].style.cursor = 'wait'
      document.getElementById('btnLogin').disabled = true
      api.login(this.user, this.password)
        .then((response) => {
          if (response.data) {
            if (response.data === 'Credenciais inválidas') {
              alert(response.data)
              this.$refs.inputUser.focus()
            } else {
              sessionStorage.setItem('token', response.data)
              sessionStorage.setItem('form', 'menu')
              this.$router.push({ name: 'Menu' })
            }
          } else {
            alert('Ocorreu um erro ao tentar fazer login. Contate o administrador do sistema.')
          }
        })
        .catch((err) => {
          if(err.response.data.message) {
            alert('Erro ' + err.response.status + ': ' + err.response.data.message)
          }
        })
        .finally(() => {
          document.getElementsByTagName('body')[0].style.cursor = 'auto'
          document.getElementById('btnLogin').disabled = false
        })
    }
  }
}
</script>

<style scope>
  html, body {
    height: 100%;
  }
  .login-page {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    height: 100%;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  img {
    object-fit: contain;
    background-color: #6c757d;
    padding: 0.75em;
    border-radius: 0.375rem;
  }
</style>