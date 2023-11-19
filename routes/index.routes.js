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
router.get("/main", async (req, res) => {
    await usersController.getUser(req, res);
    res.render("main");
});

 
module.exports = router;