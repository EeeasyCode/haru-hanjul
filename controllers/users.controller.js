const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

class UsersController {
  usersService = new UsersService(); 
  
  getUser = async (req, res) => {
    try {
      const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
      const userId = await Users.findOne({
        attributes: ['id'],
        where: {
          email: user.email
        }
      })
      res.locals.user = user;
      res.locals.userId = userId.id;
    } catch (err) {
      console.log(err);
    }
  }
  getFollower = async (req, res) => {
    try {
      const user = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
      const follow_user_data = await this.usersService.getFollowUser(user);
      res.locals.user = user;
      res.locals.followerCount = follow_user_data ? follow_user_data.Followers.length : 0;
      res.locals.followingCount = follow_user_data ? follow_user_data.Followings.length : 0;
      res.locals.followerIdList = follow_user_data ? follow_user_data.Followings.map(f => f.id) : [];
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
