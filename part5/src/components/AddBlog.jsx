import { useState } from "react";
import blogService from "../services/blogs";

const AddBlog = ({ setErrorMessage, setBlogs, setAdded }) => {
  //   const [newBlog, setNewBlog] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        console.log(returnedBlog);
        setAdded(true);
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });

    setBlogs((prev) => [...prev, newBlog]);
    setErrorMessage(`${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <label>title: </label>{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>author: </label>{" "}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br />
      <label>url: </label>{" "}
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <br />
      <button onClick={handleCreate}>create</button>
    </>
  );
};

export default AddBlog;
