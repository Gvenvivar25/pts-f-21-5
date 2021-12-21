// import { subscriber } from '../react/react'
import additionallyReducer from './additionally-reducer'
import mainReducer from './main-reducer'
import shoppingCartReducer from './shoppingCart-reducer'
import wishlistReducer from './wishlist-reducer'

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
  state.additionally = additionallyReducer(state.additionally, action)
  state.wishlist = wishlistReducer(state.wishlist, action)
  state.shoppingCart = shoppingCartReducer(state.shoppingCart, action)

  callSubscriber()
}

const store = new Store()
store.createStore()

window.store = store
export default store
