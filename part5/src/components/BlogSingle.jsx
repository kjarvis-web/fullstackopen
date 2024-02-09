import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const BlogSingle = () => {
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  console.log(blog.comments)
  blog.comments.map((x) => console.log(x.comment))
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = (comment) => {
    blogService
      .addComment(id, comment)
      .then(() => {
        console.log(blogs)
        dispatch(addComment(comment, id))
        setComment('')
      })
      .catch((error) => console.error(error))
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes}</div>
      {!blog.user ? (
        <div>no user</div>
      ) : (
        <div>added by {blog.user.username}</div>
      )}
      <h3>comments</h3>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={() => handleComment({ comment })}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((c, index) => (
          <li key={index}>{c.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogSingle
