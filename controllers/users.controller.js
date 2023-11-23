const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');

class UsersController {
  usersService = new UsersService(); 
  
  getUser = (req, res) => {
    const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    res.locals.user = user;
    console.log(JSON.stringify(user))
  }
  createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const createCheck = await this.usersService.createUser(username, email, password);
    if (createCheck) {
      return res.redirect('/?error=exist');
    }
    return res.redirect('/');
  }
}

module.exports = UsersController;
