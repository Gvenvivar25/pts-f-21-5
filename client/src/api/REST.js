export class REST {
  // _baseUrl = process.env.NEXT_PUBLIC_API
  _baseUrl = 'https://premium-shop-wg.herokuapp.com/api/'
  // _baseUrl = 'http://localhost:3300/api/'

  get(url, headers = {}) {
    return fetch(this._baseUrl + url, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .catch((e) => {
        throw e.status ? e : { status: 500 }
      })
  }

  put(url, body, headers = {}) {
    return fetch(this._baseUrl + url, {
      method: 'PUT',
      // credentials: 'include',
      body: JSON.stringify({ ...body }),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .catch((e) => {
        throw e.status ? e : { status: 500 }
      })
  }

  post(url, body, headers = {}) {
    return fetch(this._baseUrl + url, {
      method: 'POST',
      // credentials: 'include',
      body: JSON.stringify({ ...body }),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .catch((e) => {
        throw e.status ? e : { status: 500 }
      })
  }
}
