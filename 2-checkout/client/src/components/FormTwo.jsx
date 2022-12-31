import React from "react";
import { useState } from "react";

const FormTwo = (props) => {

  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onClick = (e) => {
    props.setAddress({
      address_1: addressOne,
      address_2: addressTwo,
      city: city,
      state: state,
      zipcode: zipcode,
      phone_number: phoneNumber
    });
    props.setPage('form three');
  };

  const onChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    if (id === 'address-one') {
      setAddressOne(value);
    } else if (id === 'address-two') {
      setAddressTwo(value);
    } else if (id === 'city') {
      setCity(value);
    } else if (id === 'state') {
      setState(value);
    } else if (id === 'zip') {
      setZipcode(value);
    } else if (id === 'phone') {
      setPhoneNumber(value);
    };
  }

  return (
    <div>
      <h3>Step 2</h3>
      <form>
        <div> Street Address <input type="text" id="address-one" value={addressOne} onChange={onChange} /> </div>
        <div> Apartment, suite, etc <input type="text" id="address-two" value={addressTwo} onChange={onChange} /> </div>
        <div> City <input type="text" id="city" value={city} onChange={onChange} /> </div>
        <div> State <input type="text" id="state" value={state} onChange={onChange} /> </div>
        <div> Zipcode <input type="text" id="zip" value={zipcode} onChange={onChange} /> </div>
        <div> Phone Number <input type="text" id="phone" value={phoneNumber} onChange={onChange} /> </div>
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormTwo;