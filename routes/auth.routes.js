const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { verifyToken } = require("../middlewares/verifyToken");

const authController = new AuthController();

router.post('/login', authController.authLogin);
router.get('/test', verifyToken, authController.test);
router.get("/", (req, res) => {
    res.render("first_page");
})
module.exports = router;