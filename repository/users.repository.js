const { Users } = require('../models');

class UserRepository {
  findUser = async (email) => {
    const findUserData = await Users.findOne({ where: email });
    return findUserData;
  }

  findFollowUser = async (id) => {
    try {
      const followUserData = await Users.findOne({ where: { id:id} });
      return followUserData;

    } catch (err) {
      console.log("ERROR: ",err);
    }
  }
  createUser = async (username, email, password) => {
    
    const createUserData = await Users.create({ username, email, password });

    return createUserData;
  }

  addFollowing = async (user, id) => {
    await user.addFollowing(id);
  }
}

module.exports = UserRepository;
