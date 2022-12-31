import React from "react";

const Home = (props) => {

  const onClick = (e) => {
    props.setPage('form one');
  };

  return (
    <div>
      <h1> HOME </h1>
      <button onClick={onClick}>Checkout</button>
    </div>
  )
};

export default Home;