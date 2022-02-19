const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();



async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`Connect to db`);

  app.use(routes);

  app.use((req, res, next) => {
    req.user = {
      _id: '6210120257b5de18aa5c916a'
    };
    next();
  });

  await app.listen(PORT);

  console.log(`App listening on port ${PORT}`)
}


main();