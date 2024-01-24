import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setFetch }) => {
  const [showInfo, setShowInfo] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikes = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    blogService.update(blog.id, blogObj).catch((error) => {
      console.error(error)
    })
    setFetch(true)
  }

  const handleRemove = () => {
    if (confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then((deletedBlog) =>
          console.log(`${deletedBlog} removed successfully`)
        )
        .catch((error) => console.error(error))
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
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
      <button onClick={handleRemove}>Remove</button>
      <hr />
    </div>
  )
}

export default Blog
