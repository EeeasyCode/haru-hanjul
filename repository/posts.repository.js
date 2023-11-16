const { Posts } = require('../models');

class PostRepository {
  createPost = async (date, title, content) => {
    
    const createPostData = await Posts.create({ title, content, date });

    return createPostData;
  }
}

module.exports = PostRepository;
