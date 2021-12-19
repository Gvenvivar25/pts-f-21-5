const UPDATE_CARRENT = 'UPDATE_CARRENT'
const ADD_PRODUCTS = 'ADD_PRODUCTS'

const initialState = {
  carrent: 0,
  products: [],
}

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CARRENT:
      return { ...state, ...action.body }
    case ADD_PRODUCTS: {
      return { ...state, products: action.products }
    }

    default:
      return state
  }
}

export const updateCarrent = (carrent) => ({
  type: UPDATE_CARRENT,
  body: { carrent },
})

export const addProducts = (products) => {
  return {
    type: ADD_PRODUCTS,
    products: products.filter((product) => product.isActive),
  }
}

export default mainReducer
