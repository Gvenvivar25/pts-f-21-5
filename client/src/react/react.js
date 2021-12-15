import { Component } from './newVersion/Component'

class Router {
  #id = 0
  localPath = window.location.pathname
  #search = window.location.search
  query = {}

  #setQuery() {
    let getArraySearch = this.#search.slice(1).split('&')
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
    return this.localPath
  }

  // It's the method that makes the redirect as in React/Next
  async push(pathName) {
    this.#id++
    let path = pathName === '/' ? '.' : pathName.slice(1)
    window.history.pushState({ empId: this.#id, as: pathName }, null, path)
  }

  updateLocalPath() {
    this.localPath = window.location.pathname
    if (this.#search) {
      this.#setQuery()
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

const router = new Router()

export default router

const subscriber = []

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

    const pathName = this.props.href
    let path = pathName === '/' ? '.' : pathName.slice(1)
    window.history.pushState({ empId: 1, as: pathName }, null, path)

    router.updateLocalPath()
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  render() {
    const { className = '', href, children, classActive = '' } = this.props
    const isActive = window.location.pathname === href

    return (
      <a
        className={`${className}` + (isActive ? ' ' + classActive : '')}
        href={href}
        onClick={this.onClick}
      >
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
    // this.setState({ ...this.state })
    // subscriber.push(this.updateCopmonent.bind(this))
    this.dynamicRoute()
  }

  componentDidUpdate() {
    // if(this.props.path !== router.localPath) {

    // }
    console.log('update')
    // debugger
    this.dynamicRoute()
  }

  render() {
    // debugger
    const component = this.props.component
    // console.log(this.state)
    return component
  }
}

export class BrowserRouter extends Component {
  constructor(props) {
    super(props)
    this.state = { path: router.localPath }
  }

  componentDidMount() {
    subscriber.push(this.componentDidUpdate.bind(this))
    // this.setState({ path: router.localPath })
  }

  componentDidUpdate() {
    if (router.localPath !== this.state.path) {
      this.setState({ path: router.localPath })
    }
  }

  render() {
    const def = <div>нет ничего</div>
    // debugger
    const currentRoute = this.props.children.filter(
      (child) => child.props.path === this.state.path
    )
    console.log('br', this.state.path)
    console.log('br2', router.query)

    return currentRoute.length > 0 ? currentRoute[0] : def
  }
}
