const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const passport = require('passport');

const UsersController = require('../controllers/users.controller');
const IndexController = require('../controllers/index.controller');

const usersController = new UsersController();
const indexController = new IndexController();


dotenv.config()
router.get("/", (req, res) => {
    res.render("entry_page");
});

router.use("/main", passport.authenticate('jwt', { 
    session: false, 
    failureRedirect: '/?error=TokenExpiredError' 
}));

router.get("/main", (req, res) => {
    usersController.getUser(req, res);
    res.render("main");
});

router.use("/myPage", (req, res, next) => {
    try {
        usersController.getFollower(req, res);
        next();
    } catch (err) {
        console.log(err)
    }
  });

router.get("/myPage", async (req, res) => {
    const postLists = await indexController.getPostLists(req, res);
    res.render("my_page.html", {
        postLists: postLists
    });
});
 
router.get("/community", async (req, res) => {
    const postLists = await indexController.getAllPostLists(req, res);
    res.render("community_page.html", {
        postLists: postLists
    });
});
module.exports = router;