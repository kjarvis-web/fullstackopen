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
import User from './components/User'
import userService from './services/users'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  const blogRef = useRef()
  const dispatch = useDispatch()
  const fetch = useSelector((state) => state.fetch)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
      dispatch(setFetch(false))
    })
  }, [fetch])

  useEffect(() => {
    const fetch = async () => {
      try {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
        console.log(users)
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])

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
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
