const PostsService = require('../services/posts.service');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class PostsController {
  postsService = new PostsService(); 

  createPost = async (req, res, next) => {
    const { date, title, content } = req.body;
    const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    const createPost = await this.postsService.createPost(user, title, content, date);
    if (!createPost) {
      return res.redirect('?status=again');
    }
    return res.redirect('?status=success');
  }
}

module.exports = PostsController;
