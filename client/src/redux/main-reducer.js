const UPDATE_CARRENT = 'UPDATE_CARRENT'
const ADD_PRODUCTS = 'ADD_PRODUCTS'

const initialState = {
  carrent: 0,
  products: [],
  typeProductsAll: {},
}

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CARRENT:
      return { ...state, ...action.body }
    case ADD_PRODUCTS: {
      return {
        ...state,
        products: action.products,
        typeProductsAll: action.typeProductsAll,
      }
    }

    default:
      return state
  }
}

export const updateCarrent = (carrent) => ({
  type: UPDATE_CARRENT,
  body: { carrent },
})

export const addProducts = ({ products, items }) => {
  const typeProductsAll = {}
  items.forEach((item) => (typeProductsAll[item.id] = item))

  const arrayActiveProducts = products.filter((product) => {
    if (product.isActive) {
      product.typeProduct = Object.keys(product.items).map(
        (itemId) => typeProductsAll[itemId]
      )
      return product
    }
  })

  return {
    type: ADD_PRODUCTS,
    products: arrayActiveProducts,
    typeProductsAll,
  }
}

export default mainReducer
