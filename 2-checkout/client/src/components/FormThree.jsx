import React from "react";

const FormThree = (props) => {

  const onClick = (e) => {
    props.setPage('confirmation');
  };

  return (
    <div>
      <h3>Step 3</h3>
      <form>
        form three
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormThree;