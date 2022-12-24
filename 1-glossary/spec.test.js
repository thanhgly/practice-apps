require("dotenv").config();
const axios = require('axios');
const db = require('./server/db.js');
const mongoose = require('mongoose');

describe('database', function() {

  beforeEach(() => {
    return mongoose.connect('mongodb://localhost/' + process.env.DB_NAME);
  });

  afterEach(() => {
    return db.Word.collection.drop()
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
      expect(result.length).toEqual(2);
      expect(result[1].word).toEqual('alternative');
      expect(result[1].definition).toEqual('alternative definition');
      return db.get('test');
    })
    .then((result) => {
      expect(result.length).toEqual(1);
      expect(result[0].word).toEqual('test get');
      expect(result[0].definition).toEqual('test get definition');
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
    db.save('word', 'word definiton')
    .then(() => {
      return db.get('word')
    })
    .then((result) => {
      let id = result[0]._id.toString();
      return db.remove(id);
    })
    .then(() => {
      return db.get('word');
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

describe('server side', function() {

  beforeEach(() => {
    return mongoose.connect('mongodb://localhost/' + process.env.DB_NAME);
  });

  afterEach(() => {
    return db.Word.collection.drop()
      .then(() => {
        mongoose.disconnect('mongodb://localhost/'  + process.env.DB_NAME);
      });
  });

  test('GET request to /words', function(done) {
    db.save('word', 'definition')
    .then(() => {
      return axios.get('http://localhost:3000/words');
    })
    .then((response) => {
      expect(response.data[0].word).toEqual('word');
      expect(response.data[0].definition).toEqual('definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

  test('GET request to /words with query', function(done) {
    db.save('one', 'definition one')
    .then(() => {
      return db.save('two', 'definition two');
    })
    .then(() => {
      return axios.get('http://localhost:3000/words', {params: {word: 'one'}})
      .then((response) => {
        expect(response.data.length).toEqual(1);
        expect(response.data[0].word).toEqual('one');
        expect(response.data[0].definition).toEqual('definition one');
        done()
      })
      .catch((err) => {
        console.error(err);
      });
    });
  });

  test('POST request to /words', function(done) {
    let entry = {word: 'word', definition: 'definition'};
    axios.post('http://localhost:3000/words', {entry})
    .then(() => {
      return db.get('word');
    })
    .then((data) => {
      expect(data[0].word).toEqual('word');
      expect(data[0].definition).toEqual('definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

  test('PUT request to /words', function(done) {
    db.save('word', 'word defintion')
    .then(() => {
      return db.get('word');
    })
    .then((data) => {
      let _id = data[0]._id;
      let word = 'edited word';
      let definition = 'edited definition';
      let entry = {_id, word, definition};
      return axios.put('http://localhost:3000/words', {entry})
    })
    .then(() => {
      return db.get('edited word');
    })
    .then((data) => {
      expect(data[0].word).toEqual('edited word');
      expect(data[0].definition).toEqual('edited definition');
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

  test('DELETE request to /words', function(done) {
    db.save('word', 'word defintion')
    .then(() => {
      return db.get('word');
    })
    .then((data) => {
      let _id = data[0]._id;
      return axios.delete('http://localhost:3000/words', {data: {_id}});
    })
    .then(() => {
      return db.get('word');
    })
    .then((data) => {
      expect(data.length).toEqual(0);
      done();
    })
    .catch((err) => {
      console.error(err);
    });
  });

});