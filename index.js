const express = require('express');
const helmet = require('helmet');
const https = require('https');
require('dotenv').config();
fs = require('fs');

const options = {
  key: fs.readFileSync(process.env.KEY_LOC),
  cert: fs.readFileSync(process.env.CERT_LOC),
};
const port = 8000;
const app = express();
app.use(helmet());

// parse application/json
app.use(express.json());

app.get('/', function (req, res) {
  res.status(200).json({ message: 'hi' });
});

https.createServer(options, app).listen(port);
