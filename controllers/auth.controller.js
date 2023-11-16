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

  test = async (req, res, next) => {
    try {
        console.log(req);
        console.log("main");
        return res.status(200);
    } catch (err) {
        console.log("error");
        return res.status(500);
    }
}
}



module.exports = AuthController;