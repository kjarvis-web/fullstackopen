const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

export default notificationReducer
