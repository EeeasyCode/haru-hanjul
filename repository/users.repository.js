const { Users } = require('../models');

class UserRepository {
  findUser = async (email) => {
    const findUserData = await Users.findOne({ where: email });
    return findUserData;
  }

  findFollowUser = async (id) => {
    const followUserData = await Users.findOne({ where: id });
    return followUserData;
  }
  createUser = async (username, email, password) => {
    
    const createUserData = await Users.create({ username, email, password });

    return createUserData;
  }

  addFollowing = async (id) => {
    await Users.addFollowing(id);
  }
}

module.exports = UserRepository;
