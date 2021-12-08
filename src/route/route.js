const errorComponent = [
  ['/404', () => '<div>404</div>'],
  ['/500', () => '<div>500</div>'],
]
class Router {
  #routes
  #id = 0
  #rootDiv = window.root
  #localPath = window.location.pathname

  #switch(pathName) {
    const component = this.#routes.get(pathName) || this.#routes.get('/404')
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

window.header.addEventListener('click', (e) => {
  const a = e.target.closest('a')
  if (!a || !e.currentTarget.contains(a)) return

  e.preventDefault()
  const path = a.getAttribute('href')
  router.push(path)
})

export default router
