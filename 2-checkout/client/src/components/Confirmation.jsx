import React from "react";

const Confirmation = (props) => {

  const onClick = (e) => {
    props.setPage('home');
  };

  return (
    <div>
      <h3>confirmation</h3>
      <button onClick={onClick}>Purchase</button>
    </div>
  )
};

export default Confirmation;