import store from './redux-store'

export const getWishlist = () => {
  // console.log('get', store.getState().wishlist)
  return store.getState().wishlist.wishlistID
}
