import React from "react";
import { useState } from "react";

const FormOne = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    if (id === 'name') {
      setName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id == 'password') {
      setPassword(value);
    }
  };

  const onClick = (e) => {
    props.setUser({name, email, password});
    props.setPage('form two');
  };

  return (
    <div>
      <h3>Step 1</h3>
      <form>
        <div> Name <input type="text" id="name" value={name} onChange={onChange}/> </div>
        <div> Email <input type="text" id="email" value={email} onChange={onChange}/> </div>
        <div> Password <input type="text" id="password" value={password} onChange={onChange}/> </div>
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormOne;