export const getInfo = (url, type) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 3fc50009100f8a4794408699493b41c3b84467f5',
    }
  }
  return fetch(url, options)
    .then(response => {
      if(!response.ok) {
        throw Error (`Oh no! There is a problem finding ${type}`)
      }
      return response.json()
    })
}
