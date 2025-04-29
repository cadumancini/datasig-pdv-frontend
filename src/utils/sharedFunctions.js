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
  },
  getNomUsu() {
    if (sessionStorage.getItem('paramsPDV')) {
      const paramsPDV = JSON.parse(sessionStorage.getItem('paramsPDV'))
      return paramsPDV.nomUsu
    } else if (sessionStorage.getItem('token')) {
      api.getUserParams()
      .then((response) => {
        const paramsPDV = {
          codTpr: response.data.parametrosPDV.codTpr,
          dscTot: response.data.parametrosPDV.dscTot,
          depositos: response.data.parametrosPDV.depositos,
          ramos: response.data.parametrosPDV.ramos,
          depPad: response.data.parametrosPDV.codDep,
          codEmp: response.data.parametrosPDV.codEmp,
          codFil: response.data.parametrosPDV.codFil,
          nomEmp: response.data.parametrosPDV.nomEmp,
          nomFil: response.data.parametrosPDV.nomFil,
          nomUsu: response.data.parametrosPDV.nomUsu,
          codIp: response.data.parametrosPDV.codIp,
          base: process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção' 
        }
        sessionStorage.setItem('paramsPDV', JSON.stringify(paramsPDV))
        return paramsPDV.nomUsu
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  toggleHeaderLinksDisabled(disable) {
    const elements = document.getElementsByClassName('header-link')
    if (disable)
      for (var i = 0; i < elements.length; i++) elements[i].classList.add('disabled-image')
    else
      for (var i = 0; i < elements.length; i++) elements[i].classList.remove('disabled-image')
  }
}

export default functions