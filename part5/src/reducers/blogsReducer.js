const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return { type: 'SET_BLOGS', payload: blogs }
}

export default blogsReducer
