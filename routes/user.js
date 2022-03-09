const express = require('express');
const {
  getUsers,
  getUserMe,
  getUserbyId,
  patchUserMe,
  patchUserAvatar,
} = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserMe);

userRoutes.patch('/me', express.json(), patchUserMe);

userRoutes.get('/:userId', getUserbyId);

userRoutes.patch('/me/avatar', express.json(), patchUserAvatar);

exports.userRoutes = userRoutes;
