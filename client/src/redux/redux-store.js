// import { subscriber } from '../react/react'
import mainReducer from './main-reducer'

class Store {
  #state = {}

  getState() {
    return this.#state
  }

  // dispatch(action = {}) {
  //   this.#state.main = mainReducer(this.#state.main, action)

  //   this.#callSubscriber(this.subscriber)
  // }
  createStore() {
    dispatch()
  }
}

export const subscriberStore = []

const callSubscriber = () => {
  console.log('State changed')
  // debugger
  for (const item of subscriberStore) {
    item()
  }
}

export const dispatch = (action = {}) => {
  const state = store.getState()
  state.main = mainReducer(state.main, action)

  callSubscriber()
}

const store = new Store()
store.createStore()

window.store = store
export default store
