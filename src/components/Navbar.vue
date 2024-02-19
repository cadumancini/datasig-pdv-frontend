<template>
  <nav class="navbar navbar-expand-md navbar-light mb-2" style="background-color: #dedede;">
    <a class="navbar-brand logo" href="#"><img alt="Logo DataSIG" width="20%" height="20%" src="../assets/logo.png"></a>
    <ul class="navbar-nav ms-auto actions">
      <li class="nav-item mx-2">
        <a class="nav-link" href="#" v-bind:class="{ disable: this.title === 'Menu'}" @click="return">Voltar</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="#" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      sessionStorage.setItem('form', 'login')
      this.removeAll()
      this.$router.push({ name: 'Login' })
    },
    return () {
      sessionStorage.setItem('form', 'menu')
      this.$router.go(-1)
    },
    removeAll() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('representantes')
      sessionStorage.removeItem('clientes')
      sessionStorage.removeItem('produtos')
      sessionStorage.removeItem('condicoesPagto')
      sessionStorage.removeItem('formasPagto')
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