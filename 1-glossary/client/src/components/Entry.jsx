import React from 'react';

const Entry = (props) => {

  const handleEdit = (e) => {

  };

  const handleDelete = (e) => {

  };

  return (
    <div>
      <div>Word</div>
      Definition : {'definition'}
      <div>
        <button onClick={handleEdit} > Edit </button>
        <button onClick={handleDelete} > Delete </button>
      </div>
    </div>
  )
};

export default Entry;