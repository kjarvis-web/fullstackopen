const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "password must be at least 3 characters long" });
    }

    const user = new User({
      username,
      name,
      password,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
