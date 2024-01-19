const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload
    default:
      return state
  }
}

export const getInput = (input) => {
  return {
    type: 'SEARCH',
    payload: input,
  }
}

export default filterReducer
