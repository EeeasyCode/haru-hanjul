const AuthService = require('../services/auth.service');
const passport = require("passport");

const jwt = require("jsonwebtoken");
class AuthController {
  authService = new AuthService(); 

  login = async (req, res, next) => {
    try {
      await this.authService.login(req, res, next)
    } catch(err) {
      console.log(err);
    }
  }
}



module.exports = AuthController;