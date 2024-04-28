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
  putCliente(cliente) {
    const body = JSON.stringify(cliente)
    const headers = { headers: { 'Content-Type': 'application/json' } }
    return axios.put(urlBase + '/clientes?token=' + sessionStorage.getItem('token'), body, headers)
  },
  getTabelasPreco(codRep) {
    return axios.get(urlBase + '/representantes/tabelasPreco?token=' + sessionStorage.getItem('token') + '&codRep=' + codRep)
  },
  getProdutosTabelaPreco(codTpr) {
    return axios.get(urlBase + '/produtos/tabela?token=' + sessionStorage.getItem('token') + '&codTpr=' + codTpr)
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
    return axios.put(urlBase + '/nfce?token=' + sessionStorage.getItem('token') + '&numPed=' + numPed)
  },
  getPedidos(status, order) {
    return axios.get(urlBase + '/pedidos?token=' + sessionStorage.getItem('token') + '&statusPedido=' + status + '&order=' + order)
  },
  deleteItem(pedido, item) {
    return axios.delete(urlBase + '/pedidos/item?token=' + sessionStorage.getItem('token') + '&numPed=' + pedido + '&seqIpd=' + item)
  },
  getNotas(numNfv, sitNfv, datIni, datFim) {
    let url = urlBase + '/nfce?token=' + sessionStorage.getItem('token')
    url += numNfv !== null ? '&numNfv=' + numNfv : ''
    url += sitNfv !== null ? '&sitNfv=' + sitNfv : ''
    url += datIni !== null ? '&datIni=' + datIni : ''
    url += datFim !== null ? '&datFim=' + datFim : ''
    return axios.get(url)
  },
  getPedidos(status, numPed, datIni, datFim, order) {
    let url = urlBase + '/pedidos?token=' + sessionStorage.getItem('token')
    url += '&statusPedido=' + status
    url += '&order=' + order
    url += numPed !== null ? '&numPed=' + numPed : ''
    url += datIni !== null ? '&datIni=' + datIni : ''
    url += datFim !== null ? '&datFim=' + datFim : ''
    return axios.get(url)
  },
  cancelarNFCe(codSnf, numNfv, jusCan) {
    return axios.put(urlBase + '/nfce/cancelar?token=' + sessionStorage.getItem('token') + '&codSnf=' + codSnf + '&numNfv=' + numNfv + '&jusCan=' + jusCan)
  },
  inutilizarNFCe(codSnf, numNfv, jusCan) {
    return axios.put(urlBase + '/nfce/inutilizar?token=' + sessionStorage.getItem('token') + '&codSnf=' + codSnf + '&numNfv=' + numNfv + '&jusCan=' + jusCan)
  },
  consultarEDocs(codSnf, numNfv) {
    return axios.get(urlBase + '/nfce/edocs?token=' + sessionStorage.getItem('token') + '&codSnf=' + codSnf + '&numNfv=' + numNfv)
  },
}

export default functions