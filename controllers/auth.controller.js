const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService(); 


  authLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const authLoginData = await this.authService.authLogin(username, password);

    res.cookie('user', authLoginData);
    res.status(201).json({
      result: 'ok',
      authLoginData
    });
  }

  test = async (req, res, next) => {
    try {
      return res.status(200).json({
        code: 200,
        message: "인증 완료",
        user: res.locals.userId
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;