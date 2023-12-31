const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response, next) => {
  const { body } = request;

  // if (!body.likes) {
  //   return response.status(400).json({
  //     error: "likes missing",
  //   });
  // }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog
    .save()
    .then((formatted) => response.status(201).json(formatted))
    .catch((error) => next(error));
});

// blogRouter.post("/", (request, response, next) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => response.status(201).json(result));
// });

// DELETE
blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// UPDATE
blogRouter.put("/:id", async (request, response, next) => {
  const { body } = request;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

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
module.exports = blogRouter;
