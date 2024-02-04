import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { notify, reset } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogRef = useRef()
  const [fetch, setFetch] = useState(false)

  const dispatch = useDispatch()
  const storeBlogs = useSelector((state) => state.blogs)
  console.log(storeBlogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
      // setBlogs(blogs)
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
      dispatch(notify('WRONG CREDENTIALS'))
      setTimeout(() => {
        dispatch(reset())
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

  const sorted = [...storeBlogs].sort((a, b) => b.likes - a.likes)

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
      <Notification />
      <p>{user.username} is logged in</p>
      <button id="logout" onClick={handleLogout}>
        Log out
      </button>
      <Togglable buttonLabel="add blog" ref={blogRef}>
        <AddBlog setBlogs={setBlogs} blogRef={blogRef} setFetch={setFetch} />
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
