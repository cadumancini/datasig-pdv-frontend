let axios = require('axios')

var functions = {
  getRepresentantes(urlBase, token) {
    return axios.get(urlBase + '/representantes?token=' + token)
  }
}

export default functions