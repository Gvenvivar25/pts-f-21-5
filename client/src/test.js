// import { createElement } from '../react-shim'
// import { el } from './react/react'

const elem = ({ name }) => (
  <div>
    <h3>Hello {name ? name : 'world'}</h3>
    <p>I hope you're having a good day</p>
  </div>
)

export default elem
