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
  const resPart = allProducts.slice(length, sizePart)
  // resPart.forEach(product => {
  //   product.items.forEach(item => {
  //     product.tank = store.getState().main.items.find(element => element.id === "vehicle")
  //   })
  // })
  return resPart
}
