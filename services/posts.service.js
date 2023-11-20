const PostRepository = require('../repository/posts.repository')

class PostService {
    
  postRepository = new PostRepository();

  createPost = async (date, title, content) => {

    await this.postRepository.createPost(title, content, date);
    
    return true;
  }

  getPostLists = async (user) => {

    const postLists = await this.postRepository.getPostLists(user);

    return postLists;

  }
}

module.exports = PostService;