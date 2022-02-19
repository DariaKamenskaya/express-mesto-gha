const express = require('express');
const { userRoutes } = require('./user');
const { cardsRoutes } = require('./card');
const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

exports.routes = routes;