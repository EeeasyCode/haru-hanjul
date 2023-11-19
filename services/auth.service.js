const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const UserRepository = require("../repository/users.repository");

dotenv.config();

class AuthService {
  userRepository = new UserRepository();

  authLogin = async (email, password) => {
    const checkUser = await this.userRepository.findUser({ email });
    
    if (checkUser === null) {
      return false
    }

    const hashPassword = await bcrypt.compare(password, checkUser.password);

    if (hashPassword === false) {
        return false
    }

    const authToken = this.createToken(email, checkUser.username);

    return authToken
  }

  createToken = async (email, username) => {
    const key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        type: "JWT",
        email: email,
        username: username
      },
      key,
      {
        expiresIn: "15m", 
        issuer: "admin",
      }
    );
    return token
  }
}

module.exports = AuthService;