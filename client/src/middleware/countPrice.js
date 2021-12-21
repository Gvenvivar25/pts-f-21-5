import { getCurrentCurs } from '../redux/additionally-selectors'

export const countPrice = (price) => {
  const currentCurs = getCurrentCurs()

  const CurrentPrice = Math.ceil(price * currentCurs.multiplier * 100) / 100
  return `${currentCurs.sign} ${Number(CurrentPrice.toFixed(2))}`
}

export const countPriceWithoutSing = (price) => {
  const currentCurs = getCurrentCurs()
  const CurrentPrice = Math.ceil(price * currentCurs.multiplier * 100) / 100
  return Number(CurrentPrice.toFixed(2))
}

// export const cou
