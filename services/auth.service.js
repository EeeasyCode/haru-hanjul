const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");

const UserRepository = require("../repository/users.repository");
const secret = process.env.SECRET_KEY
dotenv.config();

setUserToken = (res, email) => {
  const token = jwt.sign({
    type: "JWT",
    email: email,
  }, secret, {
    expiresIn: "10m",
    issuer: "admin",
  });
  res.cookie('user', token, {
    httpOnly: true,
  })
}

class AuthService {
  userRepository = new UserRepository();
  login = async (req, res, next) => {
    try {
      passport.authenticate('local', (passportError, user, info) => {
        if (passportError || !user) {
          return res.redirect("/?error=check");
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            return res.redirect("/?error=check");
          }
          setUserToken(res, user.email)
          res
          .redirect("/main");
        });
      })(req, res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

module.exports = AuthService;