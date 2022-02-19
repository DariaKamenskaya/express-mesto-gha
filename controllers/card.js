const card = require('../models/card');

exports.getCards = async (req,res) => {
  const cards = await card.find({});
  res.status(200).send(cards);
}

exports.deleteCardById = async (req,res) => {
  console.log(req.params.cardId);
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
  console.log(req.user._id, req.body)
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