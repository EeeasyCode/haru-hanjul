const AuthService = require('../services/auth.service');
const passport = require("passport");

class AuthController {
  authService = new AuthService(); 
  signin = async (req, res, next) => {
    const loginData = await this.authService.login(req, res, next);
    if (!loginData) {
      return res.redirect("/?error=check");
    }
    res.cookie('user', loginData);
    return res.redirect("/main");
  }
  authLogin = async (req, res) => {
    // const { email, password } = req.body;
    
    const authLoginData = await this.authService.authLogin(req, res);
    console.log(authLoginData)
    if (!authLoginData) {
      return res.redirect("/?error=check");
    }
    res.cookie('user', authLoginData);
    return res.redirect("/main");
  }
}



module.exports = AuthController;