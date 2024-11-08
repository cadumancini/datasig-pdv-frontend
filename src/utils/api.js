let axios = require('axios')

const urlBase = process.env.VUE_APP_API_URL

var functions = {
  login(user, pswd) {
    const formData = new FormData()
    formData.append('user', user)
    formData.append('pswd', pswd)
    return axios.post(urlBase + '/users/login', formData)
  },
  logout() {
    return axios.post(urlBase + '/users/logout?token=' + sessionStorage.getItem('token'))
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
  getClientesSimplified() {
    return axios.get(urlBase + '/clientes/simplified?token=' + sessionStorage.getItem('token'))
  },
  getCliente(codCli, cgcCpf) {
    let url = urlBase + '/clientes/cliente?token=' + sessionStorage.getItem('token')
    url += codCli !== null ? '&codCli=' + codCli : ''
    url += cgcCpf !== null ? '&cgcCpf=' + cgcCpf : ''
    return axios.get(url)
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
  deleteItem(pedido, item) {
    return axios.delete(urlBase + '/pedidos/item?token=' + sessionStorage.getItem('token') + '&numPed=' + pedido + '&seqIpd=' + item)
  },
  getNotas(numNfv, sitNfv, sitDoe, datIni, datFim, codRep) {
    let url = urlBase + '/nfce?token=' + sessionStorage.getItem('token')
    url += numNfv !== null ? '&numNfv=' + numNfv : ''
    url += sitNfv !== null ? '&sitNfv=' + sitNfv : ''
    url += sitDoe !== null ? '&sitDoe=' + sitDoe : ''
    url += datIni !== null ? '&datIni=' + datIni : ''
    url += datFim !== null ? '&datFim=' + datFim : ''
    url += codRep !== null ? '&codRep=' + codRep : ''
    return axios.get(url)
  },
  getPedidos(tipo, situacao, numPed, datIni, datFim, order) {
    let url = urlBase + '/pedidos?token=' + sessionStorage.getItem('token')
    url += '&tipo=' + tipo
    url += '&situacao=' + situacao
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
  cancelarPedido(numPed, sitPed) {
    return axios.post(urlBase + '/pedidos/cancelar?token=' + sessionStorage.getItem('token') + '&numPed=' + numPed + '&sitPed=' + sitPed)
  },
  consultarCEP(numCep) {
    return axios.get(urlBase + '/clientes/consultaCEP?token=' + sessionStorage.getItem('token') + '&numCep=' + numCep)
  },
  realizarOperacaoCaixa(tipoOperacao, valorOperacao, hisMov) {
    const formData = new FormData()
    formData.append('token', sessionStorage.getItem('token'))
    formData.append('tipoOperacao', tipoOperacao)
    formData.append('valorOperacao', valorOperacao)
    formData.append('hisMov', hisMov)
    return axios.post(urlBase + '/caixa', formData)
  },
  getMovimentosCaixa(datIni, datFim) {
    let url = urlBase + '/caixa/movimentos?token=' + sessionStorage.getItem('token')
    url += datIni !== null ? '&datIni=' + datIni : ''
    url += datFim !== null ? '&datFim=' + datFim : ''
    return axios.get(url)
  },
  calcularDesconto(vlrPro, vlrDsc) {
    let url = urlBase + '/pedidos/calcularDesconto?token=' + sessionStorage.getItem('token') + '&vlrPro=' + vlrPro + '&vlrDsc=' + vlrDsc
    return axios.get(url)
  },
  calcularItemComDesconto(vlrPro, vlrDsc) {
    let url = urlBase + '/pedidos/calcularItemComDesconto?token=' + sessionStorage.getItem('token') + '&vlrPro=' + vlrPro + '&vlrDsc=' + vlrDsc
    return axios.get(url)
  },
}

export default functions