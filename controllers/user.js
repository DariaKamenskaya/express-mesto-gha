const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const user = require('../models/user');

const saltPassword = 10;

exports.getUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка!', ...err });
  }
};

exports.getUserMe = async (req, res) => {
  const ownerId = req.user;
  try {
    const userSpec = await user.findById(ownerId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      res.status(404).send({ message: `Пользователь по указанному ${ownerId} не найден` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: `Невалидный id ${ownerId}` });
    }
    res.status(500).send({ message: 'Произошла ошибка!', ...err });
  }
};

exports.getUserbyId = async (req, res) => {
  const ownerId = req.params.userId;
  try {
    const userSpec = await user.findById(req.params.userId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      res.status(404).send({ message: `Пользователь по указанному ${ownerId} не найден` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: `Невалидный id ${ownerId}` });
    }
    res.status(500).send({ message: 'Произошла ошибка!', ...err });
  }
};

// создание пользователя
exports.createUser = async (req, res) => {
  // получаем данные
  const {
    name, about, avatar, email, password,
  } = req.body;
  // проверка что введен пароль и логин
  if (!email || !password) {
    res.status(400).send({ message: 'Поля "email" и "login" должно быть заполнены' });
    return;
  }
  // хешируем пароль
  bcrypt.hash(password, saltPassword)
    .then((hash) => {
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash, // записываем хеш в базу
      })
        .then((userNew) => {
          res.status(200).send({ data: userNew });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'Некорректные данные' });
          } else {
            res.status(500).send({ message: 'Произошла ошибка!', ...err });
          }
        });
    })
    .catch(() => {});
};

exports.patchUserMe = async (req, res) => {
  try {
    const { name, about } = req.body;
    const opts = { new: true, runValidators: true };
    if (!name || !about) {
      res.status(400).send({ message: 'Поля "name" и "about" должно быть заполнены' });
    } else {
      const ownerId = req.user._id;
      const userPatchMe = await user.findByIdAndUpdate(ownerId, { name, about }, opts);
      if (userPatchMe) {
        res.status(200).send({ data: userPatchMe });
      } else {
        res.status(404).send({ message: 'Переданы некорректные данные' });
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};

exports.patchUserAvatar = async (req, res) => {
  try {
    if (!req.body.avatar) {
      res.status(400).send({ message: 'Поле "avatar" должно быть заполнено' });
    } else {
      const { avatar } = req.body;
      const ownerId = req.user._id;
      const opts = { new: true, runValidators: true };
      const userPatchAvatar = await user.findByIdAndUpdate(ownerId, { avatar }, opts);
      if (userPatchAvatar) {
        res.status(200).send({ data: userPatchAvatar });
      } else {
        res.status(404).send({ message: 'Переданы некорректные данные' });
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка!', ...err });
    }
  }
};

// контроллер аутентификации (проверка почты и пароля)
exports.login = (req, res) => {
  // получаем данные
  const { email, password } = req.body;
  // ищем пользователя в базе по email-y
  return user.findUserByCredentials(email, password)
    .then((existingUser) => {
      // создадим токен
      const token = jwt.sign({ _id: existingUser._id }, 'some-secret-key', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: 'Неправильная почта или логин 3', ...err });
    });
};
