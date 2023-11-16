const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService(); 


  createPost = async (req, res, next) => {
    const { date, title, content } = req.body;
    const createPost = await this.postsService.createUser(date, title, content);
    if (!createPost) {
    //   return res.redirect('?error=exist');
        return "Error"
    }
    // return res.redirect('/');
    return "OK"
  }
}

module.exports = PostsController;
