const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'ADD_COMMENT':
      const findBlog = state.find((blog) => blog.id === action.id)
      const comments = findBlog.comments.concat(action.payload)
      const updatedBlog = { ...findBlog, comments }
      const removed = state.filter((blog) => blog.id !== action.id)
      return [...removed, updatedBlog]
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

export const addComment = (comment, id) => {
  return { type: 'ADD_COMMENT', payload: comment, id: id }
}

export default blogsReducer
