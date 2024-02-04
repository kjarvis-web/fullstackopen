const initialState = {
  title: '',
  author: '',
  url: '',
}

const addBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TITLE':
      return { ...state, title: action.payload }
    case 'AUTHOR':
      return { ...state, author: action.payload }
    case 'URL':
      return { ...state, url: action.payload }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const setTitle = (title) => {
  return {
    type: 'TITLE',
    payload: title,
  }
}

export const setAuthor = (author) => {
  return {
    type: 'AUTHOR',
    payload: author,
  }
}

export const setUrl = (url) => {
  return {
    type: 'URL',
    payload: url,
  }
}

export const clearForm = () => {
  return {
    type: 'CLEAR',
  }
}

export default addBlogReducer
