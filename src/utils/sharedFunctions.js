var functions = {
  handleRequestError(err) {
    if (err.response) {
      if (err.response.status === 401 && sessionStorage.getItem('token')) {
        alert('Seu token de acesso não é mais válido. Por favor, faça login novamente.')
        sessionStorage.clear()
        location.reload()
      }
    }
  }
}

export default functions