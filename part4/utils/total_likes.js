const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0);

module.exports = { totalLikes };
