import React from 'react';
import {useState} from 'react';


const AddEntry = (props) => {

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleDefChange = (e) => {
    setDefinition(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.addEntry(word, definition)
    .then(() => {
      return props.getEntries();
    })
    .then((data) => {
      props.setEntries(data);
      setWord('');
      setDefinition('');
    })
    .catch((err) => {
      console.error(err);
      alert('Error!')
    });
  };

  return (
    <form>
      <h3>Add new entry</h3>
      New term :
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