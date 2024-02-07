import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogSingle = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  const id = useParams().id
  console.log(id)
  const blog = blogs.find((blog) => blog.id === id)
  console.log(blog)

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
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogSingle
