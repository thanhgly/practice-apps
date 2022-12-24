import React from 'react';

const Entry = (props) => {

  let {_id, word, definition} = props.entry;

  const handleEdit = (e) => {
    let word = prompt('enter new word') || word;
    let definition = prompt('enter new definition') || definition;
    props.editEntry(_id, word, definition)
    .then(() => {
      return props.getEntries();
    })
    .then((data) => {
      props.setEntries(data);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const handleDelete = (e) => {
    props.deleteEntry(_id)
    .then(() => {
      return props.getEntries();
    })
    .then((data) => {
      props.setEntries(data);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div>
      <div> Word : {props.entry.word} </div>
      <div> Definition : {props.entry.definition} </div>
      <div>
        <button onClick={handleEdit} > Edit </button>
        <button onClick={handleDelete} > Delete </button>
      </div>
    </div>
  )
};

export default Entry;