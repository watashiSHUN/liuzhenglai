const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('dist'));

const API_URL = 'http://localhost:3000/api';
app.use('/api', (req, res) => {
  let url = API_URL + req.url;
  req.pipe(request(url)).pipe(res);
});

let PORT = process.env.PORT || 80;

app.use('/ping', (req, res) => {
  res.send(`pong at ${PORT}`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));