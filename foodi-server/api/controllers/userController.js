import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).toArray();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  // const newUser = new User(user);
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      res.status(302).json({ message: "User already exists" });
      return;
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get admin
const getAdmin = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decode.email) {
      return res
        .status(403)
        .send({ message: "You are not authorized to do that action" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make admin of a user
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllUsers, createUser, deleteUser, getAdmin, makeAdmin };
