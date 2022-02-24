const express = require('express');
const {
  getUsers,
  getUserbyId,
  createUser,
  patchUserMe,
  patchUserAvatar,
} = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserbyId);

userRoutes.patch('/me', express.json(), patchUserMe);

userRoutes.patch('/me/avatar', express.json(), patchUserAvatar);

userRoutes.post('/', express.json(), createUser);

exports.userRoutes = userRoutes;
