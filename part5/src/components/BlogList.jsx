import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector((state) => state.user)
  return (
    <div>
      <h2>blogs</h2>
      {sorted.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
