const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const UserRepository = require("../repository/users.repository");

dotenv.config();

class AuthService {
  userRepository = new UserRepository();

  authLogin = async (email, password) => {
    const checkUser = await this.userRepository.findUser({ email });
    
    const hashPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkUser || hashPassword === false) {
        return false
    }

    const authToken = this.createToken(email);

    return authToken
  }

  createToken = async (email) => {
    const key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        type: "JWT",
        email: email,
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