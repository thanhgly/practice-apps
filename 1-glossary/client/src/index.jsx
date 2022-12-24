import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AddEntry from './components/AddEntry.jsx';
import SearchEntry from './components/SearchEntry.jsx';
import EntryList from './components/EntryList.jsx';
import {useState, useEffect} from 'react';

const url = 'http://localhost:3000/words';

const App = (props) => {

  const [entries, setEntries] = useState(['place holder']);

  const getEntries = (word) => {
    return new Promise((res, rej) => {
      $.get(url, {word: word})
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        console.error(err);
      });
    });
  };

  const addEntry = (word, definition) => {
    let entry = {word, definition};
    return new Promise((res, rej) => {
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(entry),
        dataType: 'json',
        contentType: 'application/json',
        success: (response) => {
          res(response);
        },
        error: (err) => {
          rej(err);
        },
      });
    });
  };

  const editEntry = (id, word, def) => {
    return new Promise((res, rej) => {
      $.ajax({
        type: 'PUT',
        url: url,
        data: JSON.stringify({_id: id, word: word, definition: def}),
        dataType: 'json',
        contentType: 'application/json',
        success: (response) => {
          res(response);
        },
        error: (err) => {
          rej(err);
        },
      });
    });
  };

  const deleteEntry = (id) => {
    return new Promise((res, rej) => {
      $.ajax({
        type: 'DELETE',
        url,
        data: JSON.stringify({_id: id}),
        dataType: 'json',
        contentType: 'application/json',
        success: (response) => {
          res(response);
        },
        error: (err) => {
          rej(err);
        },
      });
    });
  };

  useEffect(() => {
    getEntries()
    .then((data) => {
      setEntries(data);
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <AddEntry addEntry={addEntry} getEntries={getEntries} setEntries={setEntries} />
      <SearchEntry getEntries={getEntries} setEntries={setEntries} />
      <EntryList entries={entries} editEntry={editEntry} deleteEntry={deleteEntry} setEntries={setEntries} getEntries={getEntries} />
    </div>
  )
};

ReactDOM.render( <App/>, document.getElementById('root'));