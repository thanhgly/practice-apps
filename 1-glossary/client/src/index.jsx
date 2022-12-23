import React from 'react';
import ReactDOM from 'react-dom';
import AddEntry from './components/AddEntry.jsx';
import SearchEntry from './components/SearchEntry.jsx';
import EntryList from './components/EntryList.jsx';
import {useState, useEffect} from 'react';

const App = (props) => {

  const [entries, setEntries] = useState([]);

  return (
    <div>
      <h1>Glossary</h1>
      <AddEntry/>
      <SeachEntry/>
      <EntryList entries={entries}/>
    </div>
  )
};

ReactDOM.render( <App/>, document.getElementById('root'));