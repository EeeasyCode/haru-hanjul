const UserRepository = require('../repository/users.repository')

class UserService {
  userRepository = new UserRepository();

  findAllPost = async () => {
    
    const allUser = await this.userRepository.findAllUsers();

    return allUser;
  }

  createUser = async (username, password) => {

    const createUserData = await this.userRepository.createUser(username, password);
    console.log(createUserData);
    
    return "success create user";
  }
}

module.exports = UserService;