const jwt = require('jsonwebtoken');
const { decodeJWT } = require('../helpers');
const User = require('../../models/user.model')

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers('Authorization')?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret key
    req.user = decoded.user; // Attach user info to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const authenticateAdminAccess = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1]// Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const response = decodeJWT(token)
  if (!response) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const id = response.user;
  const user = await User.findOne({ _id: id });
      if (!user || user.role !== 'admin') {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      req.user = user;
      next()
}


const authenticateAccess = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1]// Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const response = decodeJWT(token)
  if (!response) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const id = response.user;
  const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      req.user = user;
      next()
}
module.exports = { protect, authenticateAdminAccess, authenticateAccess};
