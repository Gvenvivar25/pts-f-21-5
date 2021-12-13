import mainReducer from './main-reducer'

class Store {
  #state = {
    main: {
      carrent: 0,
    },
  }

  #callSubscriber() {
    console.log('State changed')
  }

  getState() {
    return this.#state
  }

  subscribe(observer) {
    this.#callSubscriber = observer
  }

  dispatch(action) {
    this.#state.main = mainReducer(this.#state.main, action)
  }
}

export default new Store()
