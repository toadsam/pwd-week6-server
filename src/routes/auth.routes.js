// src/routes/auth.routes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth.middleware');

const router = express.Router();

// Local auth
router.post('/register', isNotAuthenticated, authController.register);
router.post('/login', isNotAuthenticated, authController.login);
router.post('/logout', isAuthenticated, authController.logout);
router.get('/me', isAuthenticated, authController.getCurrentUser);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', authController.googleCallback);

// Naver OAuth
router.get('/naver', passport.authenticate('naver'));
router.get('/naver/callback', authController.naverCallback);

module.exports = router;

