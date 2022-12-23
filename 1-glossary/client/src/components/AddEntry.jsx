import React from 'react';
import {useState} from 'react';


const AddEntry = (props) => {

  const [word, setWord] = useState('Enter new word');
  const [definition, setDefinition] = useState('Enter new word definition');

  const handleWordChange = (e) => {

  }

  cosnt handleDefChange = (e) => {

  }

  return (
    <form>
      <h3>Add new entry</h3>
      <label>
        New word:
        <input type='text' value={word} onChange={handleWordChange}/>
      </label>
      <label>
        Definition:
        <textarea value={definition} onChange={handleDefChange}/>
      </label>
      <input />
    </form>
  )
};