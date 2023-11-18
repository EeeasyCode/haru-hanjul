const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const passport = require("passport");

const UserRepository = require("../repository/users.repository");
const secret = process.env.SECRET_KEY
dotenv.config();

class AuthService {
  userRepository = new UserRepository();
  login = async (req, res, next) => {
    try {
          // 아까 local로 등록한 인증과정 실행
      passport.authenticate('local', (passportError, user, info) => {
              // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
        console.log(user)
        if (passportError || !user) {
          return res.redirect("/?error=check");
        }
              // user데이터를 통해 로그인 진행
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            return res.redirect("/?error=check");
          }
          // 클라이언트에게 JWT생성 후 반환
          const token = jwt.sign(
              { user: user.name },
              secret
          );
          res
          .cookie("user", token, {
            httpOnly: true,
          })
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