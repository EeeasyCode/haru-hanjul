const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();


router.get("/", (req, res) => {
    res.render("entry_page");
});

router.use('/main', verifyToken);
router.get("/main", (req, res) => {
    res.render("main");
});

 
module.exports = router;