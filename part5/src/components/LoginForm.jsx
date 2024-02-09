import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

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
      dispatch(notify(`welcome ${user.username}`))
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
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
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button varian="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
