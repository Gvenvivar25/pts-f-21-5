const UPDATE_CARRENT = 'UPDATE_CARRENT'

const mainReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CARRENT:
      return { ...state, ...action.body }

    default:
      return state
  }
}

export const updateCarrent = (carrent) => ({
  type: UPDATE_CARRENT,
  body: { carrent },
})

export default mainReducer
