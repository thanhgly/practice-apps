import React from 'react';
import ReactDOM from 'react-dom';
import AddEntry from './components/AddEntry.jsx';
import SearchEntry from './components/SearchEntry.jsx';
import EntryList from './components/EntryList.jsx';
import {useState, useEffect} from 'react';

const App = (props) => {



  return (
    <div>
      <h1>Glossary</h1>
      <AddEntry/>
      <SeachEntry/>
      <EntryList />
    </div>
  )
};

ReactDOM.render('Hello world', document.getElementById('root'));