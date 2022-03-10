const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const user = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const WrongDataError = require('../errors/wrong-data-err');
const WrongTokenError = require('../errors/wrong-token-err');
const ExistingEmailError = require('../errors/existing-email-err');

const saltPassword = 10;

exports.getUsers = async (req, res, next) => {
  try {
    const users = await user.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserMe = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const userSpec = await user.findById(ownerId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      throw new NotFoundError(`Пользователь по указанному ${ownerId} не найден`);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new WrongDataError(`Невалидный id ${ownerId}`));
    } else {
      next(err);
    }
  }
};

exports.getUserbyId = async (req, res, next) => {
  const ownerId = req.params.userId;
  try {
    const userSpec = await user.findById(req.params.userId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      throw new NotFoundError(`Пользователь по указанному ${ownerId} не найден`);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new WrongDataError(`Невалидный id ${ownerId}`));
    } else {
      next(err);
    }
  }
};

// создание пользователя
exports.createUser = async (req, res, next) => {
  // получаем данные
  const {
    name, about, avatar, email, password,
  } = req.body;
  // проверка что введен пароль и логин
  if (!email || !password) {
    next(new WrongDataError('Поля "email" и "password" должно быть заполнены'));
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
        .then(() => {
          res.status(200).send({
            data: {
              name,
              about,
              avatar,
              email,
            },
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new WrongDataError('Некорректные данные'));
          }
          if (err.code === 11000) {
            // ошибка: пользователь пытается зарегистрироваться по уже существующему в базе email
            next(new ExistingEmailError('Данный email уже существует в базе данных'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

exports.patchUserMe = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const opts = { new: true, runValidators: true };
    if (!name || !about) {
      throw new WrongDataError('Поля "name" и "about" должно быть заполнены');
    } else {
      const ownerId = req.user._id;
      const userPatchMe = await user.findByIdAndUpdate(ownerId, { name, about }, opts);
      if (userPatchMe) {
        res.status(200).send({ data: userPatchMe });
      } else {
        throw new NotFoundError('Переданы некорректные данные');
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new WrongDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

exports.patchUserAvatar = async (req, res, next) => {
  try {
    if (!req.body.avatar) {
      throw new WrongDataError('Поле "avatar" должно быть заполнено');
    } else {
      const { avatar } = req.body;
      const ownerId = req.user._id;
      const opts = { new: true, runValidators: true };
      const userPatchAvatar = await user.findByIdAndUpdate(ownerId, { avatar }, opts);
      if (userPatchAvatar) {
        res.status(200).send({ data: userPatchAvatar });
      } else {
        throw new NotFoundError('Переданы некорректные данные');
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new WrongDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

// контроллер аутентификации (проверка почты и пароля)
exports.login = (req, res, next) => {
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
    .catch(() => {
      next(new WrongTokenError('Ошибка авторизации: неправильная почта или логин'));
    });
};
