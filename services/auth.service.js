const AuthRepository = require('../repository/auth.repository')
const UserRepository = require("../repository/users.repository")
const bcrypt = require("bcrypt");

class AuthService {
  authRepository = new AuthRepository();
  userRepository = new UserRepository();

  authLogin = async (username, password) => {
    const checkUser = await this.userRepository.findUser({ username });
    const hashPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkUser || hashPassword === false) {
        return "check id or pw"
    }

    return "success login"
  }
}

module.exports = AuthService;