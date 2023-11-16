const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService(); 

  authLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const authLoginData = await this.authService.authLogin(email, password);

    if (!authLoginData) {
      return res.redirect("/?error=check");
    }
    res.cookie('user', authLoginData);
    return res.redirect("/main");
  }
}



module.exports = AuthController;