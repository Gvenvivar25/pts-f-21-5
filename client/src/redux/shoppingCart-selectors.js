import store from './redux-store'

export const getShoppingCart = () => {
  // debugger
  // console.log('get', store.getState().wishlist)
  return store.getState().shoppingCart.shoppingCartID
}
