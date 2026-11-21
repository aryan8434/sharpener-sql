const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("name and email are required");
    }
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).send("Email already exists");
    }
    console.log(err);
    res.status(500).send("User cannot be added");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot fetch users");
  }
};

module.exports = { addUser, getAllUsers };
