const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS users ( user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                          name VARCHAR(25) NOT NULL, \
                                          email VARCHAR(255) NOT NULL, \
                                          password VARCHAR(25), \
                                          UNIQUE (email) )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS addresses ( address_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                              address_1 VARCHAR(25) NOT NULL, \
                                              address_2 VARCHAR(25), \
                                              city VARCHAR(25) NOT NULL, \
                                              state VARCHAR(25) NOT NULL, \
                                              zipcode VARCHAR(25) NOT NULL, \
                                              phone_number VARCHAR(25) NOT NULL )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS payments ( payment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                             card_number VARCHAR(25) NOT NULL, \
                                             expiry_date VARCHAR(25) NOT NULL, \
                                             CVV VARCHAR(25) NOT NULL, \
                                             billing_zipcode VARCHAR(25) )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                              session_id VARCHAR(255) NOT NULL, \
                                              user_id INT NOT NULL, \
                                              address_id INT NOT NULL, \
                                              payment_id INT NOT NULL, \
                                              FOREIGN KEY (user_id) REFERENCES users(user_id), \
                                              FOREIGN KEY (address_id) REFERENCES addresses(address_id), \
                                              FOREIGN KEY (payment_id) REFERENCES payments(payment_id) )"
    )
  )
  .catch((err) => console.log(err));

db.createUser = (user) => {
  let queryStrings = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  let params = [user.name, user.email, user.password];
  return db.queryAsync(queryStrings, params);
};

db.createAddress = (address) => {
  let queryStrings = 'INSERT INTO addresses (address_1, address_2, city, state, zipcode, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
  let params = [address.address_1, address.address_2, address.city, address.state, address.zipcode, address.phone_number];
  return db.queryAsync(queryStrings, params);
};

db.createPayment = (card) => {
  let queryStrings = 'INSERT INTO payments (card_number, expiry_date, CVV, billing_zipcode) VALUES (?, ?, ?, ?)';
  let params = [card.card_number, card.expiry_date, card.CVV, card.billing_zipcode];
  return db.queryAsync(queryStrings, params);
};

db.createResponse = (res) => {
  let queryStrings = 'INSERT INTO responses (session_id, user_id, address_id, payment_id) VALUES (?, ?, ?, ?)';
  let params = [res.session_id, res.user_id, res.address_id, res.payment_id];
  return db.queryAsync(queryStrings, params);
};

db.getResponse = (email) => {
  let queryStrings = 'SELECT * FROM responses \
                      INNER JOIN users USING (user_id) \
                      INNER JOIN addresses USING (address_id) \
                      INNER JOIN payments USING (payment_id) \
                      WHERE users.email = ?';
  let params = [email];
  return db.queryAsync(queryStrings, params);
};

module.exports = db;
