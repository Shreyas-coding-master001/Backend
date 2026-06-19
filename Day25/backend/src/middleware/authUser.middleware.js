const jwt = require('jsonwebtoken');
const Blacklist = require('../modules/blacklist.module');

const authenticate = async (req, res, next) => {
  try {
    // Get token from header or cookie
    let token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Check if token is blacklisted
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked. Please login again.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

module.exports = { authenticate };

