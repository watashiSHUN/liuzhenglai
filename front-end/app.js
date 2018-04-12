const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('dist'));

const API_URL = 'http://localhost:3000/api';
app.use('/api', function(req, res) {
  let url = API_URL + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(80, () => console.log('listening on port 80!'));