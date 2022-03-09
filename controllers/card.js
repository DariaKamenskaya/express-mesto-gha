const card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const WrongDataError = require('../errors/wrong-data-err');
const WrongTokenError = require('../errors/wrong-token-err');
const ExistingEmailError = require('../errors/existing-email-err');
const DeleteCardError = require('../errors/delete-card-err');

exports.getCards = async (req, res) => {
  try {
    const cards = await card.find({});
    res.status(200).send(cards);
  } catch (next) {
    // res.status(500).send({ message: 'Произошла ошибка!', ...err });
  }
};

exports.deleteCardById = async (req, res) => {
  const ownerId = req.user._id; // идентификатор текущего пользователя
  const cardOwnerId = req.params.owner; // идентификатор владельца пользователя
  try {
    if (ownerId === cardOwnerId) {
      const cardSpec = await card.findByIdAndRemove(req.params.cardId);
      if (cardSpec) {
        res.status(200).send(cardSpec);
      } else {
        throw new NotFoundError('Карточка не найдена');
        // res.status(404).send({ message: 'Карточка не найдена' });
      }
    } else {
      throw new DeleteCardError('Чужая карточка не может быть удалена');
      // res.status(409).send({ message: 'Чужая карточка не может быть удалена' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next (new WrongDataError('Невалидный id '));
      // res.status(400).send({ message: 'Невалидный id ' });
    } else {
      next(err);
      // res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};

exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    if (!name || !link) {
      throw new WrongDataError('Поля "name" и "link" должны быть заполнены');
      // res.status(400).send({ message: 'Поля "name" и "link" должны быть заполнены' });
    } else {
      const cardNew = await card.create({ name, link, owner: ownerId });
      res.status(201).send({ data: cardNew });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next (new WrongDataError('Некорректные данные'));
      // res.status(400).send({ message: 'Некорректные данные' });
    } else {
      next (err);
      // res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};

exports.putCardlike = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const cardLike = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: ownerId } },
      { new: true },
    );
    if (cardLike) {
      res.status(200).send({ data: cardLike });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
      // res.status(404).send({ message: 'Переданы некорректные данные' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next (new WrongDataError('Невалидный id '));
      // res.status(400).send({ message: 'Невалидный id ' });
    } else {
      next (err);
      // res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};

exports.deleteCardLike = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const cardDislike = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: ownerId } },
      { new: true },
    );
    if (cardDislike) {
      res.status(200).send({ data: cardDislike });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
      // res.status(404).send({ message: 'Переданы некорректные данные' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next (new WrongDataError('Невалидный id '));
      // res.status(400).send({ message: 'Невалидный id ' });
    } else {
      next (err);
      // res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};
