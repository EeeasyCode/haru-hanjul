const { Users } = require('../models');

class UserRepository {
  findUser = async (username) => {
    const findUserData = await Users.findOne({ where: username });
    return findUserData;
  }
  createUser = async (username, password) => {
    
    const createUserData = await Users.create({ username, password });

    return createUserData;
  }
}

module.exports = UserRepository;