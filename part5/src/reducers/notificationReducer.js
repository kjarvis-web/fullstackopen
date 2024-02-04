const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'RESET':
      return null
    case 'ERROR':
        
    default:
      return state
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    payload: message,
  }
}

export const reset = () => {
  return {
    type: 'RESET',
  }
}

export default notificationReducer
