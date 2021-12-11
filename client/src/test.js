// import { createElement } from '../react-shim'
// import { el } from './react/react'

let a = 0
console.log(a)

const elem = ({ name }) => {
  return (
    <div>
      <h3>Hello {name ? name : 'world'}</h3>
      <p>I hope you're having a good day {a}</p>
      <button
        onClick={() => {
          console.log('button')
          a++
        }}
      >
        click
      </button>
    </div>
  )
}

export default elem
