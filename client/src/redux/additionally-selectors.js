import store from './redux-store'

export const getCurrentCurs = () => {
  return store.getState().additionally.currentCurs
}

export const getNations = () => {
  return store.getState().additionally.nations
}

export const getTiers = () => {
  return store.getState().additionally.tiers
}

export const getTypesVichels = () => {
  return store.getState().additionally.typesVichels
}

export const getAdditionallyAll = () => {
  return store.getState().additionally
}
