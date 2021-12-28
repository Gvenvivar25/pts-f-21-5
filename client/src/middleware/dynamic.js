// const dynamic = (fn) => {
//   return async () => {
//     const modul = await fn()
//     return modul.default
//   }
// }

// export default dynamic

export const getDynamicProducts = (products, countProductsCard, length) => {
  let sizePart = length + countProductsCard

  if (sizePart > products.length) {
    sizePart = products.length
  }
  const resPart = products.slice(length, sizePart)

  return resPart
}
