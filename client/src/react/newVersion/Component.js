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
    return true
  }

  updateCopmonent() {
    const prevState = this.state
    const prevElement = this._currentElement

    if (this._nextState !== prevState) {
      this.state = this._nextState
    }

    this._nextState = null
    const nextElement = this.render()
    this._currentElement = nextElement

    update(prevElement, nextElement, this._parentNode)
  }

  setState(newState) {
    // debugger
    this._nextState = Object.assign({}, this.state, newState)
    this.updateCopmonent()
  }

  render() {}
}
