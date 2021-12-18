import { subscriber } from '../react/react'
import mainReducer from './main-reducer'

class Store {
  #state = {
    main: {
      carrent: 0,
    },
  }

  #callSubscriber(subscriber) {
    console.log('State changed')
    for (const item of subscriber) {
      item()
    }
  }

  getState() {
    return this.#state
  }

  subscriber = []

  dispatch(action) {
    this.#state.main = mainReducer(this.#state.main, action)

    this.#callSubscriber(this.subscriber)
  }
}

let store = new Store()
window.store = store
export default store
