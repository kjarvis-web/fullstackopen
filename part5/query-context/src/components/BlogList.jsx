import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  const queryBlogs = result.data
  const sorted = [...queryBlogs].sort((a, b) => b.likes - a.likes)

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
