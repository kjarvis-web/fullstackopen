import { useContext } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'
import { setNotification } from '../../../redux-anecdotes/src/reducers/notificationReducer'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      console.log('new anecdote')
      return action.payload
    }
    case 'VOTE': {
      console.log('vote reducer')
      return action.payload
    }
    case 'RESET':
      return (state = null)
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
