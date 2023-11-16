const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.contoller');

const postsController = new PostsController();

router.post('/create', postsController.createPost);

module.exports = router;