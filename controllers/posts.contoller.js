const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService(); 


  createPost = async (req, res, next) => {
    const { date, title, content } = req.body;
    const createPost = await this.postsService.createPost(title, content, date);
    if (!createPost) {
      return res.redirect('?status=again');
    }
    return res.redirect('?status=success');
  }
}

module.exports = PostsController;
