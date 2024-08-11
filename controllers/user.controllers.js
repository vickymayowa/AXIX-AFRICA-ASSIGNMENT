const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "No data provided" });
  }

  const { username, email, password, gender, age } = req.body;

  if (!username || !email || !password || !gender || !age) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid data provided" });
    }
    res.status(500).send({ message: "Error creating user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: "Error getting users" });
  }
};

exports.editUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "No user ID provided" });
  }

  if (!req.body) {
    return res.status(400).send({ message: "No data provided" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid data provided" });
    }
    res.status(500).send({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "No user ID provided" });
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting user" });
  }
};
