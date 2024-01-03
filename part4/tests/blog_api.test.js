const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

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

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("deletes single blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});

test("updates information of individual blog post", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "New Title",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 90,
    __v: 0,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlog = blogsAtEnd[0];
  expect(updatedBlog.likes).toBe(90);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "kevin",
      name: "Kevin Jarvis",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("password less than 3 not accepted", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "hello",
      name: "Hi Hello",
      password: "1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(result.body.error).toContain(
      "password must be at least 3 characters"
    );
  });

  test("username less than 3 not accepted", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "hi",
      name: "Hi Hello",
      password: "hello",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(result.body.error).toContain(
      "username must be at least 3 characters"
    );
  });
});

describe("delete", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("blog is only delete by user who created it", async () => {
    const usersAtStart = await helper.usersInDb();

    await api.delete(`/api/blogs/${usersAtStart[0].id}`).expect(401);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
