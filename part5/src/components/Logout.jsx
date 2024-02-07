import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogUser')
      dispatch(logout())
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'silver',
        marginBottom: '1rem',
      }}
    >
      <Link to={'/'}>
        <div>blogs</div>
      </Link>
      <Link to={'users'}>
        <div>users</div>
      </Link>
      <p>{user.username} is logged in</p>
      <button id="logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
  )
}

export default Logout
