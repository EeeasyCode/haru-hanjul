const { Posts } = require('../models');

class PostRepository {
  createPost = async (date, title, content) => {
    
    const createPostData = await Posts.create({ date, title, content });

    return createPostData;
  }
}

module.exports = PostRepository;
