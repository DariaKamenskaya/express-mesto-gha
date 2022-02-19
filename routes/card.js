const express = require('express');
const {getCards, getCardById, createCard} = require('../controllers/card');
const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', getCardById);

cardsRoutes.post('/', express.json(), createCard);

exports.cardsRoutes = cardsRoutes;