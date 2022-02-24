const express = require('express');

const { userRoutes } = require('./user');

const { cardsRoutes } = require('./card');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

exports.routes = routes;
