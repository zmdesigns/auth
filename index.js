const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const port = 8000;
const app = express();
app.use(helmet());

// parse application/json
app.use(express.json());

app.get('/', function (req, res) {
  res.status(200).json({ message: 'hi' });
});

app.listen(port);
