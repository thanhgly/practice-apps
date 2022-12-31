import React from "react";

const FormOne = (props) => {

  const onClick = (e) => {
    props.setPage('form two');
  };

  return (
    <div>
      <h3>Step 1</h3>
      <form>
        Form one
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormOne;