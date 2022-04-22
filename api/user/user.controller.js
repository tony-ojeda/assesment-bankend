require('dotenv').config();
const User = require('./user.model')
const crypto = require("crypto");
const { validationResult } = require('express-validator');

async function getAllUsers(req, res) {
  const { status } = req.query;
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function createUser(req, res, next) {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const { errors } = validationResult(req);
  if ( errors.length ) {
    return res.status(400).json({ errors });
  }

  try {

    const user = await prepareUser(req.body)

    const userSaved = await User.create(user);

    return res.status(200).json(userSaved)
    
  } catch(err) {
    res.status(400).json({ error: err})
  } 
}

async function prepareUser({ email, password }) {
  const passwordResetToken = crypto
      .createHash('sha256')
      .update(email)
      .digest('hex');

  return new User({
    email,
    password, 
  })
}

async function updateUser(req, res) {
  const { id } = req.params
  const info = req.body;
  try {

    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    res.status(400).json({ error: err})
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succesfully", user });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
