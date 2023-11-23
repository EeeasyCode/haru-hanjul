const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/create', usersController.createUser);

router.post('/:id/follow', usersController.followUser);
module.exports = router;