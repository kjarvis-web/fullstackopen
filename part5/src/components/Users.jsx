import { useEffect } from 'react'
import userService from '../services/users'
import { setUsers } from '../reducers/usersReducer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    userService.getUsers().then((users) => dispatch(setUsers(users)))
  }, [])

  const users = useSelector((state) => state.users)
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
