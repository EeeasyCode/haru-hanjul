const UserRepository = require('../repository/users.repository')
const bcrypt = require("bcrypt");

class UserService {
  userRepository = new UserRepository();

  createUser = async (username, email, password) => {
    try {
      const checkUser = await this.userRepository.findUser({ email });
      if (checkUser) {
        return true
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await this.userRepository.createUser(username, email, hashPassword);
      
      return false;
    } catch(err) {
      console.log(err);
    }
  }

  followUser = async (follower) => {
    try {
      const user = await this.userRepository.findFollowUser(follower);
      return user;
    } catch(err) {
      console.log(err);
    }
  }
  addFollowing = async (user, id) => {
    await this.userRepository.addFollowing(user, id);
  }
}

module.exports = UserService;