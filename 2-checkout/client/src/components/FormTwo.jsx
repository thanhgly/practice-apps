import React from "react";

const FormTwo = (props) => {

  const onClick = (e) => {
    props.setPage('form three');
  };

  return (
    <div>
      <h3>Step 2</h3>
      <form>
        Form two
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormTwo;