const PostRepository = require('../repository/posts.repository')

class PostService {
    
  postRepository = new PostRepository();

  createPost = async (user, title, content, img, date) => {

    await this.postRepository.createPost(user, title, content, img, date);
    
    return true;
  }

  getPostLists = async (user) => {

    const postLists = await this.postRepository.getPostLists(user);

    return postLists;

  }

  getAllPostLists = async () => {
    const postAllLists = await this.postRepository.getAllPostLists();

    return postAllLists;
  }
}

module.exports = PostService;