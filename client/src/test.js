// import { createElement } from '../react-shim'
// import { el } from './react/react'

import { Component } from './react/newVersion/Component'

export class NestedApp extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate() {
  //   return this.props.counter % 2
  // }

  componentWillUnmount() {
    console.log('UNMOUNT:', this.props)
  }

  render() {
    return (
      <h2
        style={{
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }}
      >
        The count from parent is: {this.props?.counter}
      </h2>
    )
  }
}

export class NestedApp2 extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate() {
  //   return this.props.counter % 2
  // }

  componentWillUnmount() {
    console.log('UNMOUNT:', this.props)
  }

  render() {
    return (
      <h3
        style={{
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }}
      >
        The count from parent is: {this.props?.counter}
      </h3>
    )
  }
}
