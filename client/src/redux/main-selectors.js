import store from './redux-store'

export const getCarrent = () => {
  return store.getState().main.carrent
}

export const getAllProducts = () => {
  return store.getState().main.products
}
