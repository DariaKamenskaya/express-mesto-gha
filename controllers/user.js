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

exports.patchUserMe = async (req,res) => {
  try {
    const { name, about } = req.body;
    const ownerId = req.user._id;
    const userPatchMe = await user.findByIdAndUpdate(ownerId, {name, about} );
    if (userPatchMe) {
      res.status(200).send({data: userPatchMe});
    } else {
      res.status(400).send({message: 'Переданы некорректные данные'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}

exports.patchUserAvatar = async (req,res) => {
  try {
    const { avatar } = req.body;
    const ownerId = req.user._id;
    const userPatchAvatar = await user.findByIdAndUpdate(ownerId, {avatar});
    if (userPatchAvatar) {
      res.status(200).send({data: userPatchAvatar});
    } else {
      res.status(400).send({message: 'Переданы некорректные данные'});
    }
  }
  catch(err) {
    res.status(500).send({message: 'Произошла ошибка!', ...err});
  }
}