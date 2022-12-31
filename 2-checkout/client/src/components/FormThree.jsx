import React from "react";
import { useState } from "react";

const FormThree = (props) => {

  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingZipcode, setBillingZipcode] = useState('');

  const onClick = (e) => {
    props.setPayment({
      card_number: cardNumber,
      expiry_date: exp,
      CVV: cvv,
      billing_zipcode: billingZipcode
    });
    props.setPage('confirmation');
  };

  const onChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    if (id === 'num') {
      setCardNumber(value);
    } else if (id === 'exp') {
      setExp(value);
    } else if (id === 'cvv') {
      setCvv(value);
    } else if (id === 'bill-zip') {
      setBillingZipcode(value);
    }
  };

  return (
    <div>
      <h3>Step 3</h3>
      <form>
        <div> Credit Card Number <input type="text" id="num" value={cardNumber} onChange={onChange} /> </div>
        <div> Expiry Date <input type="text" id="exp" value={exp} onChange={onChange} /> </div>
        <div> CVV <input type="text" id="cvv" value={cvv} onChange={onChange} /> </div>
        <div> Billing Zipcode <input type="text" id="bill-zip" value={billingZipcode} onChange={onChange} /> </div>
      </form>
      <button onClick={onClick}>Next</button>
    </div>
  )
};

export default FormThree;