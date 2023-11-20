const PostRepository = require('../repository/posts.repository')

class PostService {
    
  postRepository = new PostRepository();

  createPost = async (date, title, content) => {

    await this.postRepository.createPost(title, content, date);
    
    return true
  }

  getPostLists = async (user) => {



  }
}

module.exports = PostService;