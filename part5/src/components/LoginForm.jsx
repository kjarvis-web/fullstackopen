import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      dispatch(notify('WRONG CREDENTIALS'))
      console.log(exception)
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
