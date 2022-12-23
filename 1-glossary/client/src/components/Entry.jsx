import React from 'react';

const Entry = (props) => {

  const handleEdit = (e) => {

  };

  const handleDelete = (e) => {

  };

  return (
    <div>
      <h4> {'word'} : </h4>
      Definition : {'definition'}
      <div>
        <button onClick={handleEdit} > Edit </button>
        <butoon onClick={handleDelete} > Delete </butoon>
      </div>
    </div>
  )
};

export default Entry;