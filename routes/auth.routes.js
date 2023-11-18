const express = require('express');
const router = express.Router();
const passport = require("passport");
const AuthController = require('../controllers/auth.controller');
const jwt = require("jsonwebtoken");
const authController = new AuthController();

router.post('/login', authController.login);

module.exports = router;