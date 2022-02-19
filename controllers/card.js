const card = require('../models/card');

exports.getCards = async (req,res) => {
  const cards = await card.find({});
  res.status(200).send(cards);
}

exports.deleteCardById = async (req,res) => {
  try {
    const cardSpec = await card.findByIdAndRemove(req.params.cardId);
    if (card) {
      res.status(200).send(cardSpec);
    } else {
      res.status(404).send({message: 'Карточка не найдена'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}

exports.createCard = async (req,res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;

    card.create({ name, link, owner: ownerId });
    res.status(201).send({ data: card });
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}

exports.putCardlike = async (req,res) => {
  try {
    const ownerId = req.user._id;

    const cardLike = await card.findByIdAndUpdate( req.params.cardId, { $addToSet: { likes: ownerId } }, { new: true } )
    if (cardLike) {
      res.status(201).send({ data: cardLike });
    } else {
      res.status(400).send({message: 'Переданы некорректные данные'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}

exports.deleteCardLike = async (req,res) => {
  try {
    const ownerId = req.user._id;

    const cardDislike = await card.findByIdAndUpdate( req.params.cardId, { $pull: { likes: ownerId } }, { new: true } )
    if (cardDislike) {
      res.status(201).send({ data: cardDislike });
    } else {
      res.status(400).send({message: 'Переданы некорректные данные'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}