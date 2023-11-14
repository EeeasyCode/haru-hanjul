const { Users } = require('../models');

class UserRepository {
  findAllUsers = async () => {
    
    const users = await Users.findAll();

    return users;
  }

  createUser = async (username, password) => {
    
    const createUserData = await Users.create({ username, password });

    return createUserData;
  }
}

module.exports = UserRepository;