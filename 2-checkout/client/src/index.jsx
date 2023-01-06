import React from "react";
import { render } from "react-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import FormOne from "./components/FormOne.jsx";
import FormTwo from "./components/FormTwo.jsx";
import FormThree from "./components/FormThree.jsx";
import Confirmation from "./components/Confirmation.jsx";
import axios from "axios";

const uri = 'http://localhost:3000';

const App = (props) => {

  const [page, setPage] = useState('home');
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState({});

  const response = {};

  const Methods = {};
  Methods.createUser = (user) => axios.post(`${uri}/users`, user);
  Methods.createAddress = (address) => axios.post(`${uri}/addresses`, address);
  Methods.createPayment = (payment) => axios.post(`${uri}/payments`, payment);
  Methods.createResponse = (response) => axios.post(`${uri}/responses`, response);
  Methods.getResponse = (user) => axios.get(`${uri}/responses`, {params: {email: user}});

  const onConfirm = () => {
    Methods.createUser(user)
    .catch((err) => {
      console.log('User exists!')
    })
    .then(() => {
      return Methods.getResponse(user.email);
    })
    .then( res => {
      let id = res.data[0][0].user_id;
      response.user_id = id;
      return Methods.createAddress(address);
    })
    .then( res => {
      let id = res.data[0].insertId;
      response.address_id = id;
      return Methods.createPayment(payment);
    })
    .then( res => {
      let id = res.data[0].insertId;
      response.payment_id = id;
      return Methods.createResponse(response);
    })
    .then( res => {
      alert('Transaction completed!');
    })
    .catch( err => {
      console.error(err);
      alert('ERROR!');
    })
  };

  if (page === 'home') {
    return < Home setPage={setPage} />
  } else if (page === 'form one') {
    return < FormOne setPage={setPage} setUser={setUser} />
  } else if (page === 'form two') {
    return < FormTwo setPage={setPage} setAddress={setAddress} />
  } else if (page === 'form three') {
    return < FormThree setPage={setPage} setPayment={setPayment} />
  } else if (page === 'confirmation') {
    return < Confirmation setPage={setPage} user={user} address={address} payment={payment} onConfirm={onConfirm} Methods={Methods}/>
  }
};

render(
  <div>
    <p>
      <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p>
    <App />
  </div>,
  document.getElementById("root")
);
