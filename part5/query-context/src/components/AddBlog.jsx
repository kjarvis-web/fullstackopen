import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import BlogContext from '../context/BlogContext'

const AddBlog = ({
  setErrorMessage,
  setBlogs,
  setAdded,
  blogRef,
  setFetch,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, dispatch] = useContext(BlogContext)

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      setBlogs((prev) => [...prev, returnedBlog])
      setAdded(true)
      // setErrorMessage(`${newBlog.title} by ${newBlog.author} added`)
      dispatch({ type: 'NOTIFY', payload: `${title} by ${author} added` })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      console.error(error)
      setErrorMessage(error.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    },
  })

  const handleCreate = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    setFetch(true)
    blogRef.current.toggleVisibility()
    newBlogMutation.mutate(newBlog)
  }
  return (
    <>
      <h2>create new</h2>
      {/* <form onSubmit={handleCreate}> */}
      <label>title: </label>{' '}
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <br />
      <label>author: </label>{' '}
      <input
        id="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="author"
      />
      <br />
      <label>url: </label>{' '}
      <input
        id="url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="url"
      />
      <br />
      <button id="create" onClick={handleCreate}>
        create
      </button>
      {/* </form> */}
    </>
  )
}

AddBlog.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setAdded: PropTypes.func.isRequired,
  blogRef: PropTypes.object,
}

export default AddBlog
