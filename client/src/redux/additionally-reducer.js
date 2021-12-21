const GET_ADDITIONALLY = 'GET_ADDITIONALLY'
const SET_CURRENT_CURS = 'SET_CURRENT_CURS'

const initialState = {
  currentCurs: {},
  nations: {},
  tiers: {},
  typesVichels: {},
}

const additionallyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_CURS: {
      return { ...state, currentCurs: action.currentCurs }
    }
    case GET_ADDITIONALLY: {
      return {
        currentCurs: action.currentCurs,
        nations: action.nations,
        tiers: action.tiers,
        typesVichels: action.typesVichels,
      }
    }

    default:
      return state
  }
}

export const setCurrentCur = (currentCurs) => {
  return { type: SET_CURRENT_CURS, currentCurs }
}

export const getAdditionally = ({
  currentCurs,
  nations,
  tiers,
  typesVichels,
}) => {
  const objectTiers = {}
  tiers.forEach((item) => (objectTiers[item.id] = item))

  const objectNations = {}
  nations.forEach((item) => {
    item.id
      ? (objectNations[item.id] = item)
      : (objectNations[item.name] = item)
  })
  // debugger

  const objectTypesVichels = {}
  typesVichels.forEach((item) => (objectTypesVichels[item.id] = item))

  return {
    type: GET_ADDITIONALLY,
    currentCurs,
    nations: objectNations,
    tiers: objectTiers,
    typesVichels: objectTypesVichels,
  }
}

export default additionallyReducer
