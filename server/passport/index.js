const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy } = require('passport-jwt');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/users'); 
dotenv.config();
const passportConfig = { usernameField: 'email', passwordField: 'password' };
const passportVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      done(null, user);
      return;
    }

    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const secret = process.env.SECRET_KEY

const cookieExtractor = req => {
    let jwt = null 

    if (req && req.cookies) {
        jwt = req.cookies['user']
    }
    return jwt
}

const JWTConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    done(null, jwtPayload);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};