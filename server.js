const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const CARRIS_API = 'https://carris.tecmic.com/api';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  const URL = `${CARRIS_API}${req.query.url}`;
  req.pipe(request(URL)).pipe(res);
});

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
