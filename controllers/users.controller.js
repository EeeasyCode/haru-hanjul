const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService(); 

  getUsers = async (req, res, next) => {

    const users = await this.usersService.findAllUsers();

    res.status(200).json({ data: users })
  }

  createUser = async (req, res, next) => {
    const { username, password } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createUserData = await this.usersService.createUser(username, password);

    res.status(201).json({ data: createUserData });
  }
}

module.exports = UsersController;