const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body } = request

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'content missing',
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
    comments: body.comments || [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

// DELETE
blogRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogToBeDeleted = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)
  if (blogToBeDeleted.user._id.toString() === user.id.toString()) {
    try {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  } else {
    return response.status(401).json({ error: 'Can only be deleted by user' })
  }
})

// UPDATE
blogRouter.put('/:id', async (request, response, next) => {
  const { body } = request
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

//POST COMMENT
blogRouter.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body
  const { id } = request.params

  try {
    const blog = await Blog.findById(id)
    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blog.save()
    response.status(201).json(updatedBlog)
  } catch (error) {
    logger.info(error)
    next(error)
  }
})

module.exports = blogRouter
