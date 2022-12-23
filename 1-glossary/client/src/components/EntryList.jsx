import React from 'react';
import Entry from './Entry.jsx';

const EntryList = (props) => {

  const entries = props.entries.map((entry, index) => {
    return (
      <Entry key={index} entry={entry} />
    )
  });

  return (
    <div>
      Entries :
      {entries}
    </div>
  )
};

export default EntryList;