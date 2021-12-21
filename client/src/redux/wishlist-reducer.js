const ADD_PRODUCT_IN_WISHLIST = 'ADD_PRODUCT_IN_WISHLIST'
const DELETE_PRODUCT_IN_WISHLIST = 'DELETE_PRODUCT_IN_WISHLIST'
const SET_ALL_WISHLIST = 'SET_ALL_WISHLIST'

const initialState = {
  wishlistID: [],
}

const wishlistReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_WISHLIST: {
      return {
        wishlistID: action.productListId,
      }
    }
    case ADD_PRODUCT_IN_WISHLIST: {
      // debugger
      const result = [...state.wishlistID, action.productId]

      localStorage.setItem('wishlist', JSON.stringify(result))

      return {
        wishlistID: result,
      }
    }
    case DELETE_PRODUCT_IN_WISHLIST: {
      const result = state.wishlistID.filter(
        (item) => item !== action.productId
      )

      localStorage.setItem('wishlist', JSON.stringify(result))

      return {
        wishlistID: state.wishlistID.filter(
          (item) => item !== action.productId
        ),
      }
    }

    default:
      return state
  }
}

export const setAllWishlist = () => {
  // debugger
  const productListId = JSON.parse(localStorage.getItem('wishlist')) || []
  return {
    type: SET_ALL_WISHLIST,
    productListId,
  }
}
export const addProductInWishlist = (productId) => {
  return {
    type: ADD_PRODUCT_IN_WISHLIST,
    productId,
  }
}
export const deleteProductInWishlist = (productId) => {
  return {
    type: DELETE_PRODUCT_IN_WISHLIST,
    productId,
  }
}

export default wishlistReducer
