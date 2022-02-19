const user = require("../models/user");


exports.getUsers = async (req,res) => {
  const users = await user.find({});
  res.status(200).send(users);
}

exports.getUserbyId = async (req,res) => {
  try {
    const userSpec = await user.findById(req.params.userId);
    if (userSpec) {
      res.status(200).send({data: userSpec});
    } else {
      res.status(404).send({message: 'Пользователь не найден'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}

exports.createUser = async (req,res) => {
  try {
    const { name, about, avatar } = req.body;
    user.create({ name, about, avatar });
    res.status(201).send({ data: user });
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}