const express = require('express');

const {
  getCards,
  deleteCardById,
  createCard,
  putCardlike,
  deleteCardLike,
} = require('../controllers/card');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', deleteCardById);

cardsRoutes.put('/:cardId/likes', putCardlike);

cardsRoutes.delete('/:cardId/likes', deleteCardLike);

cardsRoutes.post('/', express.json(), createCard);

exports.cardsRoutes = cardsRoutes;
