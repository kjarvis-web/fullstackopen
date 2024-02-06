import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setFetch } from './reducers/fetchReducer'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/Users'

const App = () => {
  const blogRef = useRef()
  const dispatch = useDispatch()
  const fetch = useSelector((state) => state.fetch)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
      dispatch(setFetch(false))
    })
  }, [fetch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Notification />
        <Logout />
        <Togglable buttonLabel="add blog" ref={blogRef}>
          <AddBlog blogRef={blogRef} />
        </Togglable>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
