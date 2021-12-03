//import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import DemoRouter from './components/DemoRouter';

ReactDOM.render(
  <div className="container">
    <h2>Greetings, here things are rendered</h2>
    <DemoRouter />
  </div>,
  document.getElementById('root')
);
