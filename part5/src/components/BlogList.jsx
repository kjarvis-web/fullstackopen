import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector((state) => state.user)
  return (
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          {sorted.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
