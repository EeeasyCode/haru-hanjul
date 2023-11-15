const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService(); 


  createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const createCheck = await this.usersService.createUser(username, email, password);
    if (!createCheck) {
      return res.redirect('/auth?error=exist');
    }
    return res.redirect('/auth');
  }
}

module.exports = UsersController;


