const UserRepository = require('../repository/users.repository')
const bcrypt = require("bcrypt");

class UserService {
  userRepository = new UserRepository();

  createUser = async (username, email, password) => {
    const checkUser = await this.userRepository.findUser({ email });
    if (checkUser) {
      return false
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await this.userRepository.createUser(username, email, hashPassword);
    
    return true
  }
}

module.exports = UserService;