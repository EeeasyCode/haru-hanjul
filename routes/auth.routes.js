const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { verifyToken } = require("../middlewares/verifyToken");

const authController = new AuthController();

router.post('/login', authController.authLogin);

router.post('/signin', authController.signin);
module.exports = router;