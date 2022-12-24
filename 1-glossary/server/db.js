require("dotenv").config();
const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/' + process.env.DB_NAME);

// 2. Set up any schema and models needed by the app
const wordSchema = new mongoose.Schema({
  word: {type: String, unique: true},
  definition: String,
});

// 3. Export the models
const Word = mongoose.model('Word', wordSchema);

// 4. Import the models into any modules that need them

// methods

const save = (word, def) => {
  return new Promise((res, rej) => {
    let newWord = new Word({
      word: word,
      definition: def,
    });
    newWord.save()
    .then(() => {
      res('success');
    })
    .catch((err) => {
      console.error(err);
      rej(err);
    });
  });
};

const get = (word) => {
  return new Promise((res, rej) => {
    let q = word ? {word: new RegExp(word, 'i')} : undefined;
    Word.find(q)
    .then((result) => {
      res(result);
    })
    .catch((err) => {
      console.error(err);
      rej(err);
    })
  });
};

const update = (id, word, def) => {
  return new Promise((res, rej) => {
    Word.findByIdAndUpdate(id, {word: word, definition: def})
    .then(() => {
      res('success');
    })
    .catch((err) => {
      console.error(err);
      rej(err);
    });
  });
};

const remove = (id) => {
  return new Promise((res, rej) => {
    Word.findByIdAndRemove({_id: id})
    .then(() => {
      res('success');
    })
    .catch((err) => {
      console.error(err);
      rej(err);
    });
  });
};

module.exports = {save, update, remove, get, Word};