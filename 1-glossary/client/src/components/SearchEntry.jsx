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
      <h3>Search bar</h3>
      <label>
        Search word : <input type='text' value={terms} onChange={handleChange} />
        <button onClick={search} > Find </button>
      </label>
    </div>
  )
};

export default SearchEntry;