require("dotenv").config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/words', (req, res) => {

});

app.post('/words', (req, res) => {

});

app.put('/words', (req, res) => {

});

app.detele('/words', (req, res) => {

});

app.listen(port, () => {
  console.log('Listening on port' + port);
});