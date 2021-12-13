const errorComponent = [
  ['/404', () => '<div>404</div>'],
  ['/500', () => '<div>500</div>'],
]
class Router {
  #routes
  #id = 0
  #rootDiv = window.root
  #localPath = window.location.pathname
  #search = window.location.search
  query = {}

  #setQuery() {
    let getArraySearch = this.#search.slice(1).split('&')
    let result = []

    for (const item of getArraySearch) {
      let params = item.split('=')
      if (params.length === 1) break
      result.push(params)
    }

    this.query = Object.fromEntries(result)
  }

  #switch(pathName) {
    const component = this.#routes.get(pathName) || this.#routes.get('/404')
    if (this.#search) {
      this.#setQuery()
      console.log(this.query)
    }
    return component()
  }

  // It's the method that makes the redirect as in React/Next
  async push(pathName) {
    this.#id++
    let path = pathName === '/' ? '.' : pathName.slice(1)
    window.history.pushState({ empId: this.#id, as: pathName }, null, path)
    this.#rootDiv.innerHTML = await this.#switch(pathName)
  }

  // It's the method that accepts an array as [{path: '/xxx', component: function}]. 'path' it's path which calls componnet. 'component' it's fancion which dynamically called callback
  setRoutes(arrRoute) {
    if (!arrRoute || !Array.isArray(arrRoute)) {
      throw new Error('Incorrect data: arrRoute must be Array')
    }
    this.#routes = new Map([...errorComponent, ...arrRoute])
    console.log(this.#routes)
    this.onPopState()
  }

  // It's the method that is triggered when the page loads or the path changes
  async onPopState() {
    this.#rootDiv.innerHTML = await this.#switch(this.#localPath)
  }
}

const router = new Router()

window.onpopstate = () => {
  router.onPopState()
}

export default router
