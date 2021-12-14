// import { createElement } from '../react-shim'
// import { el } from './react/react'

import { Component } from './react/newVersion/Component'

// let a = 0
// console.log(a)

// const elem = ({ name }) => {
//   return (
//     <div>
//       <h3>Hello {name ? name : 'world'}</h3>
//       <p>I hope you're having a good day {a}</p>
//       <button
//         onClick={() => {
//           console.log('button')
//           a++
//         }}
//       >
//         click
//       </button>
//     </div>
//   )
// }

// export default elem
class NestedApp extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate() {
  //   return this.props.counter % 2
  // }

  render() {
    console.log('NestedApp render')
    return (
      <h2
        style={{
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }}
      >
        The count from parent is: {this.props.counter}
      </h2>
    )
  }
}

export default NestedApp
