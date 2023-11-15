const { Users } = require('../models');

class UserRepository {
  findUser = async (email) => {
    const findUserData = await Users.findOne({ where: email });
    return findUserData;
  }

  createUser = async (username, email, password) => {
    
    const createUserData = await Users.create({ username, email, password });

    return createUserData;
  }
}

module.exports = UserRepository;
