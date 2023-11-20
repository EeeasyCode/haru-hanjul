const { Posts, Users } = require('../models');

class PostRepository {
  createPost = async (user, title, content, date) => {
    try{
    const user_data = await Users.findOne({
      attributes: ['id'],
      where: {
        email: user.email,
      }
    })
    const user_id = user_data.dataValues.id;
    
    const createPostData = await Posts.create({ title, content, date, publisher:user_id });

    return createPostData;
  } catch (err) {
    console.log("err: ", err)
  }
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
