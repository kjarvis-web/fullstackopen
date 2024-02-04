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
import { setFetch } from './reducers/fetchReducer'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

const App = () => {
  const blogRef = useRef()

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const fetch = useSelector((state) => state.fetch)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
      dispatch(setFetch(false))
    })
  }, [fetch])

  const sorted = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <Logout />
      <Togglable buttonLabel="add blog" ref={blogRef}>
        <AddBlog blogRef={blogRef} />
      </Togglable>

      <h2>blogs</h2>
      {sorted.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default App
