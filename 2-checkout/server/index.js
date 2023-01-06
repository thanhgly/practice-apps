require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.get('/responses', (req, res) => {
  let user = req.query.email;
  db.getResponse(user)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.sendStatus(404);
  })
});

app.post('/users', (req, res) => {
  let user = req.body;
  db.createUser(user)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(501);
  });
});

app.post('/addresses', (req, res) => {
  let address = req.body;
  db.createAddress(address)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(501);
  });
});

app.post('/payments', (req, res) => {
  let payment = req.body;
  db.createPayment(payment)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(501);
  });
});

app.post('/responses', (req, res) => {
  let response = req.body;
  response.session_id = req.session_id;
  db.createResponse(response)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(501);
  });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
