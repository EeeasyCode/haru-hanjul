const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");

const UserRepository = require("../repository/users.repository");

dotenv.config();

class AuthService {
  userRepository = new UserRepository();

  authLogin = async (email, password) => {
    try {
      passport.authenticate('local', user, (req, res, next) => {
        if(passportError || !user) {
          res.status(400).json({
            message: info.reason
          });
          return false
        }

        req.login(user, {session: false}, (loginError) => {
          if (loginError) {
            res.send(loginError);
            return false
          }
          const key = process.env.SECRET_KEY;
          const token = jwt.sign(
            {
              type: "JWT",
              email: email,
            },
            key,
            {
              expiresIn: "10m", 
              issuer: "admin",
            }
          );
          return token;
        });
      });
    } catch(error) {
      console.error(error);
      next(error);
    };
  };
  // const checkUser = await this.userRepository.findUser({ email });
    
  //   if (checkUser === null) {
  //     return false
  //   }

  //   const hashPassword = await bcrypt.compare(password, checkUser.password);

  //   if (hashPassword === false) {
  //       return false
  //   }

  //   const authToken = this.createToken(email);

  //   return authToken
  // }

  // createToken = async (email) => {
  //   const key = process.env.SECRET_KEY;

  //   const token = jwt.sign(
  //     {
  //       type: "JWT",
  //       email: email,
  //     },
  //     key,
  //     {
  //       expiresIn: "1m", 
  //       issuer: "admin",
  //     }
  //   );
  //   return token
  // }
}

module.exports = AuthService;