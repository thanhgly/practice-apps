import React from "react";
import { render } from "react-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import FormOne from "./components/FormOne.jsx";
import FormTwo from "./components/FormTwo.jsx";
import FormThree from "./components/FormThree.jsx";
import Confirmation from "./components/Confirmation.jsx";

const App = (props) => {

  const [page, setPage] = useState('home');

  if (page === 'home') {
    return < Home setPage={setPage} />
  } else if (page === 'form one') {
    return < FormOne setPage={setPage} />
  } else if (page === 'form two') {
    return < FormTwo setPage={setPage} />
  } else if (page === 'form three') {
    return < FormThree setPage={setPage} />
  } else if (page === 'confirmation') {
    return < Confirmation setPage={setPage} />
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
