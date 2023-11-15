const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const UserRepository = require("../repository/users.repository");

dotenv.config();

class AuthService {
  userRepository = new UserRepository();

  authLogin = async (username, password) => {
    const checkUser = await this.userRepository.findUser({ username });
    const hashPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkUser || hashPassword === false) {
        return "check id or pw"
    }
    
    const authToken = this.createToken(username);

    return authToken
  }

  createToken = async (username) => {
    const key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        type: "JWT",
        username: username,
      },
      key,
      {
        expiresIn: "1m", 
        issuer: "admin",
      }
    );
    return token
  }
}

module.exports = AuthService;