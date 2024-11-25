const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const crypto = require('crypto');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || 'your_bot_token';

app.use(bodyParser.json());

app.use(cors({
  origin: "*",
}));

const verifyTelegramData = (req, res, next) => {
  console.log("BOT_TOKEN");
  console.log(BOT_TOKEN);
  console.log(req.body)
  const encoded = decodeURIComponent(req.body.data.initData); 
  
  // HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN);

  // Data-check-string is a chain of all received fields'.
  const arr = encoded.split('&');
  const hashIndex = arr.findIndex(str => str.startsWith('hash='));
  const hash = arr.splice(hashIndex)[0].split('=')[1];

  // sorted alphabetically
  arr.sort((a, b) => a.localeCompare(b));

  // in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
  // e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
  const dataCheckString = arr.join('\n');
  
  // The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
  const _hash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');

  // if hash are equal the data may be used on your server.
  // Complex data types are represented as JSON-serialized objects.

  console.log("_HASH")
  console.log(_hash)
  console.log("hash")
  console.log(hash)

  // Сравниваем вычисленный hash с полученным
  if (_hash === hash) {
    delete req.body.data.initData;
    next();
  } 
  else {
    console.log("Invalid data!");
    return res.status(400).send("Invalid data");
  }
}

app.use('/api/products', verifyTelegramData, productsRouter);
app.use('/api/users', verifyTelegramData, usersRouter);

app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});