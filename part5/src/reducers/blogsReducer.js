const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return { type: 'SET_BLOGS', payload: blogs }
}

export const addBlog = (blog) => {
  return { type: 'ADD_BLOG', payload: blog }
}

export default blogsReducer
