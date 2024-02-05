import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showInfo, setShowInfo] = useState(true)

  const queryClient = useQueryClient()

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      console.log('mutation remove')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      conole.error(error)
    },
  })

  const handleLikesMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      console.log('like mutation')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => console.error(error),
  })

  const handleLikes = () => {
    handleLikesMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = () => {
    if (confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog.id)
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
      {user.username === blog.user.username ? (
        <button onClick={handleRemove}>Remove</button>
      ) : null}

      <hr />
    </div>
  )
}

export default Blog
