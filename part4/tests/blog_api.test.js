const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((r) => new Blog(r));
  const promiseArray = blogObjects.map((r) => r.save());
  await Promise.all(promiseArray);
});

test("blog is returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("GET returns six blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(6);
});

test("returns blog has id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.map((r) => r.id)).toBeDefined();
});

test("blog can be added", async () => {
  const newBlog = {
    title: "New Blog Title",
    author: "New Author",
    url: "www.url.com",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await helper.blogsInDb();
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("if likes property is missing, will default to value 0", async () => {
  const newBlog = {
    title: "new title",
    author: "author author",
    url: "www.urlurl.com",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body.likes).toBe(0);
});

test("if title or url properties are missing, responds with status code 400 bad request", async () => {
  const newBlog = {
    author: "author",
    likes: 9,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
