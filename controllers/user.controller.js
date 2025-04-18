const { generateJWT } = require('../src/helpers/index');
const User = require('../models/user.model')
const bcrypt = require('bcrypt'); 



exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logIn = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
      return res.status(400).json({ message: 'Password Incorrect'});
    }

    const token = generateJWT({user: user._id})
    return res.status(200).json({ message: 'Login Successful', token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error'});
  }

}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error'});
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message: 'User not found'});
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, role } = req.body;

    if (req.user.role !== 'admin'){
      return res.status(403).json({message: 'Forbidden: You are not authorized to update user rolw'});
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    
    if (password) {
      user.password = password;
      user.password = await bcrypt.hash(user.password, 10);
    }

    await user.save();

    return res.status(200).json({
      message: 'User updated successfully',
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCurrentUser = (req,res) => {
  return res.status(200).json({ message: 'Success', user: req.user })
}


exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};