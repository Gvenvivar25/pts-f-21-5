const GET_ADDITIONALLY = 'GET_ADDITIONALLY'

const initialState = {
  currentCurs: {},
  nations: {},
  tiers: {},
  typesVichels: {},
}

const additionallyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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

export const getAdditionally = ({
  currentCurs,
  nations,
  tiers,
  typesVichels,
}) => {
  const objectTiers = {}
  tiers.forEach((item) => (objectTiers[item.id] = item))

  const objectNations = {}
  nations.forEach((item) => (objectNations[item.id] = item))
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
