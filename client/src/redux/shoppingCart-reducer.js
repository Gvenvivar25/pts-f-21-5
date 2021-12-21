const ADD_PRODUCT_IN_SHOPPING_CART = 'ADD_PRODUCT_IN_SHOPPING_CART'
const DELETE_PRODUCT_IN_SHOPPING_CART = 'DELETE_PRODUCT_IN_SHOPPING_CART'
const SET_ALL_SHOPPING_CART = 'SET_ALL_SHOPPING_CART'
// const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

const initialState = {
  shoppingCartID: [],
  // totalPrice: 0,
}

const shoppingCartReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_SHOPPING_CART: {
      return { ...state, shoppingCartID: action.productListId }
    }
    case ADD_PRODUCT_IN_SHOPPING_CART: {
      // debugger
      const result = [...state.shoppingCartID, action.productId]

      localStorage.setItem('shoppingCart', JSON.stringify(result))

      return { ...state, shoppingCartID: result }
    }
    case DELETE_PRODUCT_IN_SHOPPING_CART: {
      const result = state.shoppingCartID.filter(
        (item) => item !== action.productId
      )

      localStorage.setItem('shoppingCart', JSON.stringify(result))

      return {
        ...state,
        shoppingCartID: state.shoppingCartID.filter(
          (item) => item !== action.productId
        ),
      }
    }

    default:
      return state
  }
}

export const setAllShoppingCart = () => {
  // debugger
  const productListId = JSON.parse(localStorage.getItem('shoppingCart')) || []
  return {
    type: SET_ALL_SHOPPING_CART,
    productListId,
  }
}
export const addProductInShoppingCart = (productId) => {
  return {
    type: ADD_PRODUCT_IN_SHOPPING_CART,
    productId,
  }
}
export const deleteProductInShoppingCart = (productId) => {
  return {
    type: DELETE_PRODUCT_IN_SHOPPING_CART,
    productId,
  }
}

export const getTotalPrice = () => {}

export default shoppingCartReducer
