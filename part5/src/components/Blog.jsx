import { useState } from "react";

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(true);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return showInfo ? (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowInfo(!showInfo)}>view</button>
    </div>
  ) : (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}</div>
      <div>{blog.user.name}</div>
    </div>
  );
};

export default Blog;
