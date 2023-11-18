const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("entry_page");
});

router.use('/main', passport.authenticate('jwt', { session: false }));
router.get("/main", (req, res) => {
    res.render("main");
});

 
module.exports = router;