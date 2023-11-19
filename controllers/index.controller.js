const jwt = require('jsonwebtoken');

class IndexController {
  postsService = new PostsService(); 

  getPostLists = (req, res) => {
    const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    const postLists = user;
  }
}

module.exports = IndexController;
