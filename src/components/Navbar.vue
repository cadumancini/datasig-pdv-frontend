<template>
  <nav class="navbar navbar-expand-md navbar-light mb-1" style="background-color: #dedede;">
    <a class="navbar-brand logo header-link" href="#"><img alt="Logo DataSIG" width="20%" height="20%" src="../assets/logo.png"></a>
    <ul class="navbar-nav ms-auto actions">
      <li class="nav-item mx-2 my-auto">
        <a class="nav-link header-link" href="#" :class="{ disable: this.title === 'Menu'}" @click="goBack">Voltar</a>
      </li>
      <li class="nav-item mx-2 my-auto">
        <a class="nav-link header-link" href="#" id="linkLogout" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import api from '../utils/api'

export default {
  name: 'Navbar',
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
  .disabled-image {
    pointer-events: none;
  }
</style>