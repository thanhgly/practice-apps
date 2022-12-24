import React from 'react';
import {useState} from 'react';

const SearchEntry = (props) => {

  const [terms, setTerms] = useState('');

  const handleChange = (e) => {
    setTerms(e.target.value);
  };

  const search = (e) => {
    props.getEntries(terms)
    .then((data) => {
      props.setEntries(data);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div>
      <h3>Search bar</h3>
      <label>
        Search : <input type='text' value={terms} onChange={handleChange} />
        <button onClick={search} > Find </button>
      </label>
    </div>
  )
};

export default SearchEntry;