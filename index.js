const express = require('express');
const helmet = require('helmet');
const auth = require('./routes/auth');
require('dotenv').config();

const port = 8000;
const app = express();
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.get('/', function (req, res) {
  res.status(200).json({ message: 'hi' });
});

app.use('/auth', auth);

app.listen(port, '0.0.0.0');
