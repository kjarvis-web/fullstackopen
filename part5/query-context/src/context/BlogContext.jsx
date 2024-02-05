import { useReducer } from 'react'
import { createContext } from 'react'

const BlogContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

export const BlogContextProvider = (props) => {
  const [notification, setNotification] = useReducer(notificationReducer, null)
  return (
    <BlogContext.Provider value={[notification, setNotification]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContext
