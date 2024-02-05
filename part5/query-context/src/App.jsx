import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import BlogContext from './context/BlogContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [added, setAdded] = useState(false)
  const blogRef = useRef()
  const [fetch, setFetch] = useState(false)
  const [notification, dispatch] = useContext(BlogContext)
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const queryBlogs = result.data
  console.log(queryBlogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      setFetch(false)
    })
  }, [fetch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
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
      setUser(null)
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
        <AddBlog
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setAdded={setAdded}
          blogRef={blogRef}
          setFetch={setFetch}
        />
      </Togglable>

      <h2>blogs</h2>
      {sorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          setFetch={setFetch}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
