import { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { notify, reset } from '../reducers/notificationReducer'
import {
  clearForm,
  setAuthor,
  setTitle,
  setUrl,
} from '../reducers/addBlogReducer'
import { setFetch } from '../reducers/fetchReducer'
import { addBlog } from '../reducers/blogsReducer'
// import PropTypes from 'prop-types'

const AddBlog = ({ blogRef }) => {
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.addBlog)
  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(setFetch(true))
    blogRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then((returnedBlog) => {
        dispatch(notify(`${blog.title} by ${blog.author} added`))
        setTimeout(() => {
          dispatch(reset(null))
        }, 5000)
        dispatch(clearForm())
        dispatch(addBlog(returnedBlog))
      })
      .catch((error) => {
        console.error(error)
        dispatch(notify(error.response.data.error))
        setTimeout(() => {
          dispatch(reset(null))
        }, 5000)
      })
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <label>title: </label>{' '}
        <input
          id="title"
          type="text"
          value={blog.title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="title"
        />
        <br />
        <label>author: </label>{' '}
        <input
          id="author"
          type="text"
          value={blog.author}
          onChange={(e) => dispatch(setAuthor(e.target.value))}
          placeholder="author"
        />
        <br />
        <label>url: </label>{' '}
        <input
          id="url"
          type="text"
          value={blog.url}
          onChange={(e) => dispatch(setUrl(e.target.value))}
          placeholder="url"
        />
        <br />
        <button id="create" type="submit">
          create
        </button>
      </form>
    </>
  )
}

// AddBlog.propTypes = {
//   setErrorMessage: PropTypes.func.isRequired,
//   setBlogs: PropTypes.func.isRequired,
//   setAdded: PropTypes.func.isRequired,
//   blogRef: PropTypes.object,
// }

export default AddBlog
