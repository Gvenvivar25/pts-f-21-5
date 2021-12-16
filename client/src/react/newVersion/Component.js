import { mount } from './mounting'
import { update } from './updating'

export class Component {
  constructor(props) {
    this.props = props || {}
    this.state = {}

    this._currentElement = null
    this._nextState = null
    this._parentNode = null
  }

  shouldComponentUpdate() {
    // if (nextProps == prevComponent.props && nextState == this.state)
    //   return false
    return true
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate() {}

  updateCopmonent() {
    const prevState = this.state
    const prevElement = this._currentElement

    if (this._nextState !== prevState && this._nextState != null) {
      this.state = this._nextState
      this._nextState = null
    }

    let nextElement = this.render()
    this._currentElement = nextElement

    update(prevElement, nextElement, this._parentNode)
  }

  setState(newState) {
    // debugger
    if (typeof newState === 'function') {
      this._nextState = Object.assign(
        this.state,
        newState(this.state, this.props)
      )
    } else {
      this._nextState = Object.assign({}, this.state, newState)
    }
    this.updateCopmonent()
  }

  render() {}
}
