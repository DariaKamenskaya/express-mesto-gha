const express = require('express');
const {getCards, deleteCardById, createCard} = require('../controllers/card');
const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', deleteCardById);

cardsRoutes.put('/:cardId/likes', deleteCardById);

cardsRoutes.delete('/:cardId/likes', deleteCardById);

cardsRoutes.post('/', express.json(), createCard);

exports.cardsRoutes = cardsRoutes;