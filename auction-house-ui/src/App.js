import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,

} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Client from './client'
import LoginPage from './Login.js';
import BlockchainContainer from './Blockchain.js';
import AboutPage from './About.js';
import RegistrationPage from './Registration.js';



import BusinessNetworkConnection from 'composer-client';


class App extends Component {
  render() {
    return (
      <div className="Page">
        <div className="Nav">
          <ul>
            <li id="logo"></li>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/blockchain">Blockchain</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <Route path="/" exact component={LoginPage} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route path="/blockchain" exact component={BlockchainContainer} />
        <Route path="/about" exact component={AboutPage} />
      </div>
    );
  }
}






export default App;
