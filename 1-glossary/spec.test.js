require("dotenv").config();
const db = require('./server/db.js');
const mongoose = require('mongoose');

describe('database', function() {

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/' + process.env.DB_NAME);
    done();
  });

  afterAll(() => {
    db.Word.collection.drop()
      .then(() => {
        mongoose.disconnect('mongodb://localhost/'  + process.env.DB_NAME);
      });
  });

  test('save method', function(done) {
    db.save('test', 'test definition')
    .then(() => {
      return db.Word.find({word: 'test'});
    })
    .then((result) => {
      expect(result[0].word).toEqual('test');
      expect(result[0].definition).toEqual('test definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

  test('get method', function(done) {
    db.save('test get', 'test get definition')
    .then(() => {
      return db.get();
    })
    .then((result) => {
      expect(result[1].word).toEqual('test get');
      expect(result[1].definition).toEqual('test get definition');
      return db.get('test');
    })
    .then((result) => {
      expect(result[0].word).toEqual('test');
      expect(result[0].definition).toEqual('test definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });


});