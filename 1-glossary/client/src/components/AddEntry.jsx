import React from 'react';
import {useState} from 'react';


const AddEntry = (props) => {

  const [word, setWord] = useState('Enter new word');
  const [definition, setDefinition] = useState('Enter new word definition');

  const handleWordChange = (e) => {

  };

  const handleDefChange = (e) => {

  };

  const handleClick = (e) => {

  };

  return (
    <form>
      <h3>Add new entry</h3>
      New word :
      <div>
        <input type='text' value={word} onChange={handleWordChange}/>
      </div>
      Definition :
      <div>
        <textarea value={definition} onChange={handleDefChange}/>
      </div>
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
    </form>
  )
};

export default AddEntry;