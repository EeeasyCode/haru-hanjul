const UserRepository = require('../repository/users.repository')
const bcrypt = require("bcrypt");

class UserService {
  userRepository = new UserRepository();

  createUser = async (username, password) => {
    const checkUser = await this.userRepository.findUser({ username });
    if (checkUser) {
      return "이미 존재하는 계정입니다."
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await this.userRepository.createUser(username, hashPassword);

    return "success create user";
  }
}

module.exports = UserService;