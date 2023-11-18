const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("entry_page");
});

router.use("/main", passport.authenticate('jwt', { 
    session: false, 
    failureRedirect: '/?error=TokenExpiredError' 
}));

router.get("/main", (req, res) => {

    return res.render('main')
});


 
module.exports = router;