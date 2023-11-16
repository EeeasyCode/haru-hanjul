const PostRepository = require('../repository/posts.repository')

class PostService {
    
  postRepository = new PostRepository();

  createPost = async (date, title, content) => {

    await this.postRepository.createPost(date, title, content);
    
    return true
  }
}

module.exports = PostService;