const card = require('../models/card');

exports.getCards = async (req,res) => {
  const cards = await card.find({});
  res.status(200).send(cards);
}

exports.getCardById = async (req,res) => {
  try {
    const card = await card.findById(req.params.cardId);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({message: 'Пользователь не найден'});
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

    user.create({ name, link, owner: ownerId });
    res.status(201).send({ data: card });
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}