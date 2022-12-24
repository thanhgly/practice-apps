require("dotenv").config();
const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/words', (req, res) => {
  let word = req.query.word;
  db.get(word)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  })
});

app.post('/words', (req, res) => {
  let {word, definition} = req.body.entry;
  db.save(word, definition)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(409);
  });
});

app.put('/words', (req, res) => {
  let {_id, word, definition} = req.body.entry;
  db.update(_id, word, definition)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  });
});

app.delete('/words', (req, res) => {
  let _id = req.body._id;
  db.remove(_id)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  });
});

app.listen(port, () => {
  console.log('Listening on port' + port);
});