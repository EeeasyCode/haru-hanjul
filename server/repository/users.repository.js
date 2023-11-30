const { Users } = require('../models');

class UserRepository {
  findUser = async (email) => {
    const findUserData = await Users.findOne({ where: email });
    return findUserData;
  }

  getFollowUser = async (user) => {
    const find_follow_data = Users.findOne({
      where: { email: user.email },
        include: [{
          model: Users,
          attributes: ['id', 'username'],
          as: 'Followers',
        }, {
          model: Users,
          attributes: ['id', 'username'],
          as: 'Followings',
        }],
    });
    return find_follow_data;
  }
  createUser = async (username, email, password) => {
    
    const createUserData = await Users.create({ username, email, password });

    return createUserData;
  }

  followUser = async (follower) => {
    return await Users.findOne({ where: { username: follower } });
  }
  addFollowing = async (user, id) => {
    try {

      await user.addFollowing(id);
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = UserRepository;
