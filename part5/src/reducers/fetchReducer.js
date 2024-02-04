const fetchReducer = (state = false, action) => {
  switch (action.type) {
    case 'TRUE':
      return true
    case 'FALSE':
      return false
    default:
      return state
  }
}

export const setFetch = (value) => {
  return {
    type: value ? 'TRUE' : 'FALSE',
  }
}

export default fetchReducer
