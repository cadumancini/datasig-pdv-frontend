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
    try {
      if (value === null || value === undefined || value === '') return 'R$ 0,00'
      const num = Number(value)
      if (isNaN(num)) return 'R$ 0,00'
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    } catch (ex) {
      return 'R$ 0,00'
    }
  },
  toMoneyThenNumber(value) {
    try {
      if (value === null || value === undefined || value === '') return 0
      if (typeof value === 'number') return Number(Number(value).toFixed(2))
      let str = String(value)
      // remove currency symbol, white spaces; remove thousand separators (.) and convert decimal comma to dot
      str = str.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')
      const num = Number(parseFloat(str))
      return isNaN(num) ? 0 : Number(Number(num).toFixed(2))
    } catch (ex) {
      return 0
    }
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
          indImp: response.data.parametrosPDV.indImp,
          qtdImp: response.data.parametrosPDV.qtdImp,
          base: process.env.VUE_APP_BASE === 'teste' ? 'Base Homologação' : 'Base Produção',
          codCli: response.data.parametrosPDV.codCli,
          botOrc: response.data.parametrosPDV.botOrc,
          botPed: response.data.parametrosPDV.botPed,
          botPnf: response.data.parametrosPDV.botPnf,
          botNfc: response.data.parametrosPDV.botNfc
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