const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3300/api/'
    : 'https://premium-shop-wg.herokuapp.com/api/'
export class REST {
  // #baseUrl = process.env.NEXT_PUBLIC_API
  // #baseUrl =  'https://premium-shop-wg.herokuapp.com/api/'
  #baseUrl = BASE_URL

  get(url, headers = {}) {
    return fetch(this.#baseUrl + url, {
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
    return fetch(this.#baseUrl + url, {
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
    return fetch(this.#baseUrl + url, {
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
