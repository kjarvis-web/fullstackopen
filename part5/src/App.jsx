import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/UserList'
import User from './components/User'
import userService from './services/users'
import { setUsers } from './reducers/usersReducer'
import BlogSingle from './components/BlogSingle'

const App = () => {
  const blogRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetch = async () => {
      try {
        blogService.getAll().then((blogs) => {
          dispatch(initializeBlogs(blogs))
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
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
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogSingle />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
