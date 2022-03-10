const express = require('express');
const {
  getUsers,
  getUserMe,
  getUserbyId,
  patchUserMe,
  patchUserAvatar,
} = require('../controllers/user');
const {
  patchUserMeValidation,
  patchUserAvatarValidation,
  userIdValidation,
} = require('../middlewares/validatons');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserMe);

userRoutes.patch('/me', patchUserMeValidation, express.json(), patchUserMe);

userRoutes.get('/:userId', userIdValidation, getUserbyId);

userRoutes.patch('/me/avatar', patchUserAvatarValidation, express.json(), patchUserAvatar);

exports.userRoutes = userRoutes;
