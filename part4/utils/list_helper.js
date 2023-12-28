const dummy = (blogs) => (blogs = 1);

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce(
    (acc, curr) => (acc.likes > curr.likes ? acc : curr),
    0
  );
  return mostLikes;
};

module.exports = { dummy, favoriteBlog };
