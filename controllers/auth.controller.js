const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService(); 


  authLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const authLoginData = await this.authService.authLogin(username, password);

    res.status(200).json({ data: authLoginData });
  }
}

module.exports = AuthController;