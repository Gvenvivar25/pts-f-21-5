import { Component } from './newVersion/Component'

class Router {
  #id = 0
  localPath = window.location.pathname
  search = window.location.search
  query = {}

  #setQuery(newSearch) {
    this.search = newSearch
    let getArraySearch = this.search.slice(1).split('&')
    let result = []

    for (const item of getArraySearch) {
      //check is param ''
      if (item == '' || item == ' ') continue

      let params = item.split('=')
      // check is rigth item param search
      if (params.length === 1) continue
      // add item param search
      result.push(params)
    }

    this.query = Object.fromEntries(result)
  }

  get localPath() {
    if (this.localPath !== window.location.pathname) {
      this.updateLocalPath()
    }
    return this.localPath
  }
  get search() {
    if (this.search !== window.location.search) {
      this.updateLocalPath()
    }
    return this.search
  }

  getSearch() {
    return this.search
  }

  // It's the method that makes the redirect as in React/Next
  // async push(pathName) {
  //   this.#id++
  //   let path = pathName === '/' ? '.' : pathName.slice(1)
  //   window.history.pushState({ empId: this.#id, as: pathName }, null, path)
  // }

  updateLocalPath() {
    this.localPath = window.location.pathname
    if (window.location.search !== this.search) {
      this.#setQuery(window.location.search)
    }
  }

  // It's the method that is triggered when the page loads or the path changes
  onPopState(subscriber) {
    // debugger
    this.updateLocalPath()

    for (const item of subscriber) {
      item()
    }
  }
}

export const router = new Router()

// export default router

export const subscriber = []

window.onpopstate = () => {
  router.onPopState(subscriber)
}

export class Link extends Component {
  constructor(props) {
    super(props)
  }

  onClick = (e) => {
    if (e.metaKey || e.ctrlKey) {
      return
    }

    e.preventDefault()
    // debugger
    const pathName = this.props.href
    window.history.pushState({ as: pathName }, null, pathName)
    router.updateLocalPath()

    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  componentDidMount() {
    subscriber.push(this.updateCopmonent.bind(this))
  }

  render() {
    const { className = '', href, children, classActive = '' } = this.props
    let allPathName = router.localPath
    // debugger
    if (router.search) {
      allPathName += router.search
    }
    const isActive = allPathName === href

    let finallyClassName = className
    if (isActive && classActive) {
      finallyClassName += className ? ' ' + classActive : classActive
    }

    return (
      <a className={finallyClassName} href={href} onClick={this.onClick}>
        {children}
      </a>
    )
  }
}

export class Route extends Component {
  constructor(props) {
    super(props)
    this.state = { isDownload: false }
  }

  dynamicRoute = () => {
    if (!this.state.isDownload) {
      this.setState({ isDownload: true })
      if (this.props.render) {
        this.props.render().then((mode) => {
          this.setState({ ...this.state, render: mode })
        })
      }
    }
  }

  componentDidMount() {
    // debugger
    console.log(router.localPath)
    this.dynamicRoute()
  }

  componentDidUpdate() {
    this.dynamicRoute()
  }

  render() {
    // debugger
    const component = this.props.component
    return component
  }
}

export class BrowserRouter extends Component {
  constructor(props) {
    super(props)
    this.state = { path: router.localPath, search: router.search }
  }

  componentDidMount() {
    subscriber.push(this.componentDidUpdate.bind(this))
  }

  componentDidUpdate() {
    // debugger
    if (router.localPath !== this.state.path) {
      this.setState({ ...this.state, path: router.localPath })
    }
    if (router.search !== this.state.search) {
      this.setState({ ...this.state, search: router.search })
    }
  }

  render() {
    // debugger
    const def = <div>нет ничего</div>
    const currentRoute = this.props.children.filter(
      (child) => child.props.path === this.state.path
    )

    return currentRoute.length > 0 ? currentRoute[0] : def
  }
}
