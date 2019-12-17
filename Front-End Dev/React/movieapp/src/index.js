import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import Slider from './Slider';

import * as serviceWorker from './serviceWorker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));


// ReactDOM.render(<NavigationBar />, document.getElementById('NavigationBar'));
// ReactDOM.render(<SearchBar />, document.getElementById('SearchBar'));
// ReactDOM.render(<Slider />, document.getElementById('Slider'));

// ReactDOM.render(<Movie />, document.getElementById('movie'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
