const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("entry_page");
})

module.exports = router;