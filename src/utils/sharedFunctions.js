import { default as api } from './api'

var functions = {
  handleRequestError(err) {
    if (err.response) {
      if (err.response.status === 401 && sessionStorage.getItem('token')) {
        alert('Seu token de acesso não é mais válido. Por favor, faça login novamente.')
        api.logout()
        sessionStorage.clear()
        location.reload()
      } else {
        if(err.response.data.message) alert (err.response.data.message)
      }
    }
  },
  toMoneyString(value) {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  },
  toMoneyThenNumber(value) {
    return Number(this.toMoneyString(value)
      .replace('R$', '').replace('.','').replace(',','.').trim())
  },
  populateTabIndex(list) {
    let index = 0
    list.forEach(item => {
      item.tabIndex = index
      index++
    })
  }
}

export default functions