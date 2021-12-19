import store from './redux-store'

export const getCarrent = () => {
  return store.getState().main.carrent
}

export const getDynamicProducts = (countProductsCard, length) => {
  const allProducts = store.getState().main.products

  let sizePart = length + countProductsCard

  if (sizePart > allProducts.length) {
    sizePart = allProducts.length
  }
  return allProducts.slice(length, sizePart)
}
