const { Posts, Users } = require('../models');

class PostRepository {
  createPost = async (date, title, content) => {
    
    const createPostData = await Posts.create({ title, content, date });

    return createPostData;
  }

  getPostLists = async (user) => {
    const user_data = await Users.findOne({
      where: {
        username: user.username,
      }
    })
    const postLists = await user_data.getPosts()
    return postLists
    }
}

module.exports = PostRepository;
