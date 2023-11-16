const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

const authController = new AuthController();

router.get("/", (req, res) => {
    res.render("entry_page");
});

router.get("/main", verifyToken, authController.test);

module.exports = router;