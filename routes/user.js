const express = require('express');
const {getUsers, getUserbyId, createUser} = require('../controllers/user');
const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserbyId);

userRoutes.post('/', express.json(), createUser);

exports.userRoutes = userRoutes;