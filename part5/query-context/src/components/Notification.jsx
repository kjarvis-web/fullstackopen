import { useContext } from 'react'
import BlogContext from '../context/BlogContext'

const Notification = ({ added }) => {
  const stylesAdded = {
    color: 'green',
    fontSize: 32,
    border: 'green solid 4px',
    marginBottom: 16,
    borderRadius: '5px',
    background: 'silver',
    padding: 4,
  }

  const stylesError = {
    color: 'red',
    fontSize: 32,
    border: 'red solid 4px',
    marginBottom: 16,
    borderRadius: '5px',
    background: 'silver',
    padding: 4,
  }

  const [notification, dispatch] = useContext(BlogContext)

  if (notification === null) return null

  return (
    <div style={added ? stylesAdded : stylesError} className="notification">
      {notification}
    </div>
  )
}

export default Notification
