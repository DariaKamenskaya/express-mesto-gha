const express = require('express');

const { userRoutes } = require('./user');

const { cardsRoutes } = require('./card');

const routes = express.Router();

const NotFoundError = require('../errors/not-found-err');

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

routes.use('/', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

exports.routes = routes;
