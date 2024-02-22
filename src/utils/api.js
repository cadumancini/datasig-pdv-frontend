let axios = require('axios')

const urlBase = process.env.VUE_APP_API_URL

var functions = {
  login(user, pswd) {
    const formData = new FormData()
    formData.append('user', user)
    formData.append('pswd', pswd)
    return axios.post(urlBase + '/users/login', formData)
  },
  getUserParams() {
    return axios.get(urlBase + '/users/params?token=' + sessionStorage.getItem('token'))
  },
  getRepresentantes() {
    return axios.get(urlBase + '/representantes?token=' + sessionStorage.getItem('token'))
  },
  getClientes() {
    return axios.get(urlBase + '/clientes?token=' + sessionStorage.getItem('token'))
  },
  getProdutos() {
    return axios.get(urlBase + '/produtos?token=' + sessionStorage.getItem('token'))
  },
  getPreco(codTpr, produto) {
    return axios.get(urlBase + '/produtos/preco?token=' + sessionStorage.getItem('token') + 
                      '&codTpr=' + codTpr + '&codPro=' + produto.codPro + '&codDer=' + produto.codDer + '&qtdPdv=' + produto.qtdPed)
  },
  getTabelasPreco(codRep) {
    return axios.get(urlBase + '/representantes/tabelasPreco?token=' + sessionStorage.getItem('token') + '&codRep=' + codRep)
  },
  getCondicoesPagto() {
    return axios.get(urlBase + '/pagamentos/condicoes?token=' + sessionStorage.getItem('token'))
  },
  getFormasPagto() {
    return axios.get(urlBase + '/pagamentos/formas?token=' + sessionStorage.getItem('token'))
  },
  putPedido(pedido) {
    const body = JSON.stringify(pedido)
    const headers = { headers: { 'Content-Type': 'application/json' } }
    return axios.put(urlBase + '/pedidos?token=' + sessionStorage.getItem('token'), body, headers)
  },
  putNFCe(numPed) {
    return axios.put(urlBase + '/pedidos/nfce?token=' + sessionStorage.getItem('token') + '&numPed=' + numPed)
  }
}

export default functions