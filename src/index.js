import React from 'react';

require('es6-promise').polyfill();
require('styles/custom.scss');

import ReactDOM from 'react-dom'
import Paragraph from "./components/generic/Paragraph";


document.addEventListener('DOMContentLoaded', function(){
  const el = document.getElementById("app-container")

  if (el) {
    ReactDOM.render(<Paragraph value={"Inserted Paragraph using React"} />, el)
  }
})
