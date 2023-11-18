const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("entry_page");
});

router.get("/main", passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        console.log(req)
        return res.render('main')
    } catch (error) {
        console.log(req)
        return res.redirect("/?error=TokenExpiredError");
    }
});

 
module.exports = router;