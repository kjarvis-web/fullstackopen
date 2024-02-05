import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import BlogContext from '../context/BlogContext'

const AddBlog = ({ setAdded, blogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useContext(BlogContext)

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setAdded(true)
      setNotification({
        type: 'NOTIFY',
        payload: `${title} by ${author} added`,
      })
      setTimeout(() => {
        setNotification({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      console.error(error)
      setNotification({ type: 'NOTIFY', payload: error.data.error })
      setTimeout(() => {
        setNotification({ type: 'RESET' })
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

// AddBlog.propTypes = {
//   setErrorMessage: PropTypes.func.isRequired,
//   setBlogs: PropTypes.func.isRequired,
//   setAdded: PropTypes.func.isRequired,
//   blogRef: PropTypes.object,
// }

export default AddBlog
