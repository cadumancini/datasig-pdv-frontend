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
  customRound(num) {
    const numStr = num.toString()
    const decimalIndex = numStr.indexOf('.')
    let result = ''
  
    for (let i = numStr.length - 1; i >= decimalIndex + 1; i--) {
      const digit = parseInt(numStr[i])
      if (digit > 5) {
        result = (parseInt(numStr[i - 1]) + 1).toString() + result
        i--; // Skip the next digit as it's already processed
      } else {
        result = digit.toString() + result
      }
    }
  
    result = numStr.slice(0, decimalIndex) + '.' + result
    return Number(result.slice(0, result.indexOf('.') + 3))
  }
}

export default functions