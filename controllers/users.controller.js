const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');

class UsersController {
  usersService = new UsersService(); 
  
  getUser = (req, res) => {
    const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    res.locals.user = user;
  }
  getFollower = (req, res) => {
    try {
      const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
      console.log(user)
      res.locals.user = user;
      res.locals.followerCount = req.user ? req.user.Followers.length : 0;
      res.locals.followingCount = req.user ? req.user.Followings.length : 0;
      res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    } catch(err) {
      console.log(err)
    }
  }
  createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const createCheck = await this.usersService.createUser(username, email, password);
    if (createCheck) {
      return res.redirect('/?error=exist');
    }
    return res.redirect('/');
  }
  followUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const follower = jwt.verify(req.cookies.user, process.env.SECRET_KEY).username;
      const user = await this.usersService.followUser(follower);
      if (user) {
        await this.usersService.addFollowing(user, parseInt(id, 10));
        res.send('success');
      } else {
        res.status(404).send('no user');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UsersController;
