import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <p>
          AUCTIONHOUSE
        </p>
      </div>
    );
  }
}

class LoginButton extends Component {
  render() {
    return (
      <div className="Login-button">
        <p className="Login-text">
          Log in to the blockchain.
        </p>
      </div>
    );
  }
}

class LoginEntryFields extends Component {
  render() {
    return (
      <div className="LoginField">
        <p>Username:</p>
        <input type="text" name="username"/>
        <p>Password:</p>
        <input type="text" name="password"/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="Login">
          <LoginButton/>
          <LoginEntryFields/>
        </div>
      </div>
    );
  } 
}






export default App;
