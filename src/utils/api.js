let axios = require('axios')

const urlBase = process.env.VUE_APP_API_URL

var functions = {
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
  getFormasPagto(codRep) {
    return axios.get(urlBase + '/pagamentos/formas?token=' + sessionStorage.getItem('token'))
  },
  putPedido(pedido) {
    const body = JSON.stringify(pedido)
    const headers = { headers: { 'Content-Type': 'application/json' } }
    return axios.put(urlBase + '/pedidos?token=' + sessionStorage.getItem('token'), body, headers)
  }
}

export default functions