const PostRepository = require('../repository/posts.repository')

class PostService {
    
  postRepository = new PostRepository();

  createPost = async (user, title, content, date) => {

    await this.postRepository.createPost(user, title, content, date);
    
    return true;
  }

  getPostLists = async (user) => {

    const postLists = await this.postRepository.getPostLists(user);

    return postLists;

  }
}

module.exports = PostService;