import React from "react";
import { useState } from "react";

const Confirmation = (props) => {

  const onClick = (e) => {
    props.onConfirm();
    props.setPage('home');
  };

  return (
    <div>
      <h3>Summary</h3>
      <div>
        <h4> User Information </h4>
        <p> Name : {props.user.name} </p>
        <p> Email : {props.user.email} </p>
        <p> Password : {props.user.password} </p>
      </div>
      <div>
        <h4> Shipping Address </h4>
        <p> Street Address : {props.address.address_1} </p>
        <p>Apartment, suite, etc : {props.address.address_2} </p>
        <p> City : {props.address.city} </p>
        <p> State : {props.address.state} </p>
        <p> ZIP/postal code : {props.address.zipcode} </p>
      </div>
      <div>
        <h4> Payment </h4>
        <p> Credit Card Number : {props.payment.card_number} </p>
        <p> Expiry Date : {props.payment.expiry_date} </p>
        <p> CVV : {props.payment.CVV} </p>
        <p> Billing zipcode : {props.payment.billing_zipcode} </p>
      </div>
      <button onClick={onClick}>Purchase</button>
    </div>
  )
};

export default Confirmation;