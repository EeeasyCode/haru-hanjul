const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService(); 

  createUser = async (req, res, next) => {
    const { username, password } = req.body;

    const createUserData = await this.usersService.createUser(username, password);

    res.status(201).json({ data: createUserData });
  }
}

module.exports = UsersController;