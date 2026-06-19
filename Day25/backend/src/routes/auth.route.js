const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/authUser.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);

module.exports = router;

