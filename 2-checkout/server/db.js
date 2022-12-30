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
      "CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                          name VARCHAR(25) NOT NULL, \
                                          email VARCHAR(255) NOT NULL, \
                                          password VARCHAR(25), \
                                          UNIQUE (email) )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS addresses ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                              address_1 VARCHAR(25) NOT NULL, \
                                              address_2 VARCHAR(25), \
                                              city VARCHAR(20) NOT NULL, \
                                              state VARCHAR(20) NOT NULL, \
                                              zipcode VARCHAR(20) NOT NULL, \
                                              phone_number VARCHAR(25) NOT NULL )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS payments ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                             card_number VARCHAR(25) NOT NULL, \
                                             expiry_date VARCHAR(5) NOT NULL, \
                                             CVV VARCHAR(3) NOT NULL, \
                                             billing_zipcode VARCHAR(10) )"
    )
  )
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
                                              session_id VARCHAR(255) NOT NULL, \
                                              user_id INT NOT NULL, \
                                              address_id INT NOT NULL, \
                                              payment_id INT NOT NULL, \
                                              FOREIGN KEY (user_id) REFERENCES users(id), \
                                              FOREIGN KEY (address_id) REFERENCES addresses(id), \
                                              FOREIGN KEY (payment_id) REFERENCES payments(id), \
                                              UNIQUE (session_id) )"
    )
  )
  .catch((err) => console.log(err));

db.createUser = (user) => {
  let queryStrings = [user.name, user.email, user.password];
  return db.queryAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', queryStrings);
};

db.createAddress = (address) => {
  let queryStrings = [address.address_1, address.address_2, address.city, address.state, address.zipcode, address.phone_number];
  return db.queryAsync('INSERT INTO addresses (address_1, address_2, city, state, zipcode, phone_number) VALUES (?, ?, ?, ?, ?, ?)', queryStrings);
};

db.createPayment = (card) => {
  let queryStrings = [card.card_number, card.expiry_date, card.CVV, card.billing_zipcode];
  return db.queryAsync('INSERT INTO payments (card_number, expiry_date, CVV, billing_zipcode) VALUES (?, ?, ?, ?)', queryStrings);
};

db.createResponse = (res) => {
  let queryStrings = [res.session_id, res.user_id, res.address_id, res.payment_id];
  return db.queryAsync('INSERT INTO responses (session_id, user_id, address_id, payment_id) VALUES (?, ?, ?, ?)', queryStrings);
}

module.exports = db;
