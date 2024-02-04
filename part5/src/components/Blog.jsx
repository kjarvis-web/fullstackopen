import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setFetch } from '../reducers/fetchReducer'

const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const handleLikes = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    blogService.update(blog.id, blogObj).catch((error) => console.error(error))
    dispatch(setFetch(true))
  }

  const handleRemove = () => {
    if (confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then((deletedBlog) => {
          console.log(`${deletedBlog} removed successfully`)
          dispatch(setFetch(true))
        })
        .catch((error) => console.error(error))
    } else null
  }

  return showInfo ? (
    <div className="preview" style={blogStyle}>
      {blog.title} {blog.author}
      <button className="viewBtn" onClick={() => setShowInfo(!showInfo)}>
        view
      </button>
    </div>
  ) : (
    <div className="allInfo">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button className="likeBtn" onClick={handleLikes}>
          like
        </button>
      </div>

      {blog.user ? <div>{blog.user.name}</div> : <div>no user</div>}
      {blog.user ? (
        user.username === blog.user.username ? (
          <button onClick={handleRemove}>Remove</button>
        ) : null
      ) : (
        <div>no user</div>
      )}
      <hr />
    </div>
  )
}

export default Blog
