const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

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
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
  // blog
  //   .save()
  //   .then((formatted) => response.status(201).json(formatted))
  //   .catch((error) => next(error));
})

// blogRouter.post("/", (request, response, next) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => response.status(201).json(result));
// });

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

// blogRouter.put("/:id", (request, response, next) => {
//   const { body } = request;
//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   };

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then((updatedBlog) => response.json(updatedBlog))
//     .catch((error) => next(error));
// });
module.exports = blogRouter
