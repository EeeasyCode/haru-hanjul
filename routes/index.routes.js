const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const dotenv = require('dotenv');
const UsersController = require('../controllers/users.controller');
const IndexController = require('../controllers/index.controller');

const usersController = new UsersController();
const indexController = new IndexController();

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
    indexController.getPostLists(req, res);
    res.render("my_page");
});
 
module.exports = router;