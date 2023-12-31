const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// blogRouter.post("/api/blogs", (request, response, next) => {
//   const { body } = request;
//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   });

//   blog
//     .save()
//     .then((formatted) => response.status(201).json(formatted))
//     .catch((error) => next(error));
// });

blogRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => response.status(201).json(result));
});
module.exports = blogRouter;
