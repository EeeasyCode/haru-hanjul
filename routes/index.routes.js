const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const dotenv = require('dotenv');
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
dotenv.config()
router.get("/", (req, res) => {
    res.render("entry_page");
});

router.use('/main', verifyToken);
router.get("/main", (req, res) => {
    usersController.getUser(req, res);
    res.render("main");
});

router.get("/myPage", (req, res) => {
    res.render("my_page");
});
 
module.exports = router;