const { Users } = require('../models');

class UserRepository {

  createUser = async (username, password) => {
    
    const createUserData = await Users.create({ username, password });

    return createUserData;
  }
}

module.exports = UserRepository;