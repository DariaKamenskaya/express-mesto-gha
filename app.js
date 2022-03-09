const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // app.use((req, res, next) => {
  //   req.user = {
  //     _id: '6210120257b5de18aa5c916a',
  //   };
  //   next();
  // });

  // роуты, не требующие авторизации - регистрация и логин
  app.post('/signup', express.json(), createUser);
  app.post('/signin', express.json(), login);

  // авторизация
  app.use(auth);

  // роуты, которым авторизация нужна
  app.use(routes);

  await app.listen(PORT);
}

main();
