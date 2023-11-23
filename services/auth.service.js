const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");

const UserRepository = require("../repository/users.repository");
const secret = process.env.SECRET_KEY
dotenv.config();

setUserToken = (res, user) => {
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
          setUserToken(res, user)
          res
          .redirect("/main");
        });
      })(req, res);
    } catch (error) {
      console.error(error);
      next(error);
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
  };
}

module.exports = AuthService;