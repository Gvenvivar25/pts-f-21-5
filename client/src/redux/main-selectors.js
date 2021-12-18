import store from './redux-store'

export const getCarrent = () => {
  return store.getState().main.carrent
}
