const express = require('express');
const {
  getUsers,
  getUserbyId,
  patchUserMe,
  patchUserAvatar,
} = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserbyId);

userRoutes.patch('/me', express.json(), patchUserMe);

userRoutes.patch('/me/avatar', express.json(), patchUserAvatar);

exports.userRoutes = userRoutes;
