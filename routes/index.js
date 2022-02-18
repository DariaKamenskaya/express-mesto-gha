const express = require('express');
const { userRoutes } = require('./user');
const routes = express.Router();

routes.use('/users', userRoutes);

exports.routes = routes;