import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import BlogContext from './context/BlogContext'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserContext from './context/UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [added, setAdded] = useState(false)
  const [notification, dispatch] = useContext(BlogContext)
  const [user, setUser] = useContext(UserContext)
  const blogRef = useRef()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const queryBlogs = result.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({ type: 'NOTIFY', payload: 'Wrong credentials' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogUser')
      setUser({ type: 'LOGOUT' })
    } catch (exception) {
      console.log(exception)
    }
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const sorted = [...queryBlogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification />
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
      </div>
    )
  }

  return (
    <div>
      <Notification added={added} />
      <p>{user.username} is logged in</p>
      <button id="logout" onClick={handleLogout}>
        Log out
      </button>
      <Togglable buttonLabel="add blog" ref={blogRef}>
        <AddBlog setAdded={setAdded} blogRef={blogRef} />
      </Togglable>

      <h2>blogs</h2>
      {sorted.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
      {/* <BlogList /> */}
    </div>
  )
}

export default App
