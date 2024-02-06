import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { useEffect } from 'react'
import { setUsers } from '../reducers/usersReducer'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  return (
    <div>
      <h2>{user.username}</h2>
      <h1>added blogs</h1>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
