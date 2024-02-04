const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return action.payload
    default:
      return state
  }
}

export default userReducer

export const setUser = (user) => {
  return { type: 'LOGIN', payload: user }
}

export const logout = () => {
  return { type: 'LOGOUT', payload: null }
}
