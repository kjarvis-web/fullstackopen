const dummy = (blogs) => (blogs = 1);

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce(
    (acc, curr) => (acc.likes > curr.likes ? acc : curr),
    0
  );
  return mostLikes;
};

const mostBlogs = (blogs) => {
  const obj = blogs.reduce((acc, curr) =>
    acc.blogs > curr.blogs ? acc : curr
  );
  return obj.author;
};

const mostLikes = (blogs) => {
  const obj = blogs.reduce(
    (acc, curr) => (acc.likes > curr.likes ? acc : curr),
    0
  );
  const { author, likes } = obj;
  return { author, likes };
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
