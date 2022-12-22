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
      return db.save('alternative', 'alternative definition');
    })
    .then(() => {
      return db.get();
    })
    .then((result) => {
      expect(result.length).toEqual(3);
      expect(result[2].word).toEqual('alternative');
      expect(result[2].definition).toEqual('alternative definition');
      return db.get('test');
    })
    .then((result) => {
      expect(result.length).toEqual(2);
      expect(result[0].word).toEqual('test');
      expect(result[0].definition).toEqual('test definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

  test('update method', function(done) {
    db.save('word', 'word definition')
    .then(() => {
      return db.get('word');
    })
    .then((result) => {
      let id = result[0]._id.toString();
      return db.update(id, 'update', 'update definition');
    })
    .then(() => {
      return db.get('update');
    })
    .then((result) => {
      expect(result[0].word).toEqual('update');
      expect(result[0].definition).toEqual('update definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    })
  });

  test('remove method', function(done) {
    db.get('update')
    .then((result) => {
      let id = result[0]._id.toString();
      return db.remove(id);
    })
    .then(() => {
      return db.get('update');
    })
    .then((result) => {
      expect(result.length).toEqual(0);
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

});