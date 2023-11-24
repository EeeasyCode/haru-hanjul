const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");
const secret = process.env.SECRET_KEY
dotenv.config();

setUserToken = async (res, user) => {
  const token = jwt.sign({
    type: "JWT",
    email: user.email,
    username: user.username,
  }, secret, {
    expiresIn: "10m",
    issuer: "admin",
  });
  res.cookie('user', token, {
    httpOnly: true,
  })
}

class AuthService {
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
          setUserToken(res, user)
          res
          .redirect("/main");
        });
      })(req, res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = AuthService;