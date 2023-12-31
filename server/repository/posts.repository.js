const { Posts, Users } = require('../models');

class PostRepository {
  createPost = async (user, title, content, img, date) => {
    try{
    const user_data = await Users.findOne({
      attributes: ['id'],
      where: {
        email: user.email,
      }
    })
    const user_id = user_data.dataValues.id;

    const createPostData = await Posts.create({ title, content, img, date, publisher:user_id });

    return createPostData;
  } catch (err) {
    console.log("err: ", err)
    return false;
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

    getAllPostLists = async () => {
      const postAllLists = await Posts.findAll({
        include: {
          model: Users,
          attributes: ['id', 'username'],
        },
        order: [['created_at', 'DESC']],
      });
      return postAllLists;
    }
}

module.exports = PostRepository;
