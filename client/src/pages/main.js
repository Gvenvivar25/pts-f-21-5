import { getCarrent } from '../redux/main-selectors'
import store from '/redux/redux-store'
import s from './main.module.css'
import { updateCarrent } from '../redux/main-reducer'

console.log(s)
class Main {
  current = getCarrent(store.getState())

  constructor(store) {
    this.store = store
  }

  increment() {
    this.store.dispacth(updateCarrent(this.current + 1))
    console.log(this.current)
  }

  render() {
    return `<div class=${s.test}>test style</div>
    <p>${this.current}</p>
      <button onclick=${this.increment}>click</button>
    `
  }
}

const main = new Main(store)
// store.subscribe(main.render)
console.log(main)
export default main.render()
