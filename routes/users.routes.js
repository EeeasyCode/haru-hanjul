const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;