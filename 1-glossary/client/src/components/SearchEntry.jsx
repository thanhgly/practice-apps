import React from 'react';
import {useState} from 'react';

const SearchEntry = (props) => {

  const [terms, setTerms] = useState('Enter word to search');

  const handleChange = (e) => {

  };

  const search = () => {

  };

  return (
    <div>
      <label>
        Search word : <input type={text} value={terms} onChange={handleChange} />
        <button onClick={search} > find </button>
      </label>
    </div>
  )
};

export default SearchEntry;