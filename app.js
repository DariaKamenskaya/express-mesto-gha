const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req,res) => {
  res.send('Hello !')
});

async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`Connect to db`);

  await app.listen(PORT);

  console.log(`App listening on port ${PORT}`)
}


main();