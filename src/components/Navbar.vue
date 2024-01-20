<template>
  <nav class="navbar navbar-expand-md navbar-light mb-2" style="background-color: #dedede;">
    <a class="navbar-brand logo" href="#"><img alt="Feeling" src="../assets/logo.png"></a>
    <h1 class="h5 mx-5 pt-2">{{ this.title }}</h1>
    <ul class="navbar-nav ms-auto actions">
      <li class="nav-item mx-2" v-if="this.title !== 'Portal Web'">
        <a class="nav-link" href="#" @click="return">Voltar</a>
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
      sessionStorage.removeItem('token')
      this.$router.push({ name: 'Login' })
    },
    return () {
      this.$router.go(-1)
    }
  },
  props: {
    title: String
  }
}
</script>

<style scoped>
  @media (max-width: 400px) {
    .logo {
      display: none;
    }
  }
  .actions {
    flex-direction: row !important;
  }
</style>