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

  signin = async (req, res, next) => {
    const loginData = await this.authService.login(req, res, next);
    if (loginData === "USER NOT FOUND" || loginData === "LOGIN ERROR") {
      return res.redirect("/?error=check");
    }
    console.log("loginData: "+loginData);
    res.cookie('user', loginData);
    return res.redirect("/main");
  }
}



module.exports = AuthController;