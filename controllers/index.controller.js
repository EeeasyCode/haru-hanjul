const PostsService = require('../services/posts.service');
const jwt = require('jsonwebtoken');

class IndexController {
  postsService = new PostsService(); 

  getPostLists = async (req, res) => {
    const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    const postLists = await this.postsService.getPostLists(user);
    return postLists;
    }
}

module.exports = IndexController;
