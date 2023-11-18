const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");

const UserRepository = require("../repository/users.repository");

dotenv.config();

class AuthService {
  userRepository = new UserRepository();
  login = async (req, res, next) => {
      try {
        passport.authenticate('local', {session: false}, (err, user) => {
          if (err || !user) {
              return res.status(400).json({
                  message: 'Something is not right',
                  user: user
              });
          }
          req.login(user, {session: false}, (err) => {
              if (err) {
                  res.send(err);
              }
              const key = process.env.SECRET_KEY;
              const token = jwt.sign(
                {
                  type: "JWT",
                  email: user.email,
                },
                key,
                {
                  expiresIn: "10m", 
                  issuer: "admin",
                }
              );
              return token;
          });
      })(req, res);
      } catch (err) {
        console.log(err)
      }
  }
  authLogin = async (req, res, next) => {
    try {
      passport.authenticate('local', (passportError, user, info) => {
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