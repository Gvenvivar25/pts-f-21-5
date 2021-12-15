import { Component } from './newVersion/Component'

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

    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  render() {
    const { className, href, children, classActive } = this.props
    const isActive = window.location.pathname === href

    return (
      <a
        className={
          `${className}` + (isActive && classActive ? ' ' + classActive : '')
        }
        href={href}
        onClick={this.onClick}
      >
        {children}
      </a>
    )
  }
}

export const subscriber = []

export class Route extends Component {
  constructor(props) {
    super(props)
    this.state = { component: null, path: window.location.pathname }
  }

  componentDidMount() {
    subscriber.push(this.updateCopmonent.bind(this))
  }

  componentDidUpdate() {
    console.log('update')
    debugger
    if (!this.state.component && this.props.href === this.statepath) {
      this.props.render().then((mode) => this.setState({ component: mode }))
    }
  }

  render() {
    debugger
    console.log('route', this.state.path)
    // const { path, render } = this.props
    if (window.location.pathname === this.props.path) {
      if (!this.state?.component) {
        return <div>Loading...</div>
      } else {
        return this.state.component
      }
    }
    return null
  }
}
