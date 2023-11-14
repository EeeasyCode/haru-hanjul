const UserRepository = require('../repository/users.repository')
const bcrypt = require("bcrypt");

class UserService {
  userRepository = new UserRepository();

  createUser = async (username, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const createUserData = await this.userRepository.createUser(username, hashPassword);

    return "success create user";
  }
}

module.exports = UserService;