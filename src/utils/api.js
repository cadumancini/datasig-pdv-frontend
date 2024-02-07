let axios = require('axios')

const urlBase = process.env.VUE_APP_API_URL

var functions = {
  getRepresentantes() {
    return axios.get(urlBase + '/representantes?token=' + sessionStorage.getItem('token'))
  },
  getClientes() {
    return axios.get(urlBase + '/clientes?token=' + sessionStorage.getItem('token'))
  },
  getProdutos(codTpr) {
    return axios.get(urlBase + '/produtos?token=' + sessionStorage.getItem('token') + '&codTpr=' + codTpr)
  },
  getTabelasPreco(codRep) {
    return axios.get(urlBase + '/representantes/tabelasPreco?token=' + sessionStorage.getItem('token') + '&codRep=' + codRep)
  }
}

export default functions