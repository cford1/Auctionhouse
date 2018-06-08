import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,

} from 'react-router-dom';
import './App';


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

class LoginText extends Component {
  render() {
    return (
      <div className="Login-text">
        <p>
          Log in to the blockchain.
        </p>
      </div>
    );
  }
}

class LoginEntryFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };


    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    this.setState({ username: "", password: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="LoginField">
        <p>Username:</p>
        <input type="text" onChange={this.handleUserChange} />
        <p>Password:</p>
        <input type="text" onChange={this.handlePassChange} onSubmit={this.handleSubmit} />
        <br />
        <input class="Login-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit} />
      </div>
    );
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  render() {
    return (
      <div className="LoginPage">
        <Header />
        <div className="Login">
          <LoginText />
          <LoginEntryFields />
        </div>
      </div>
    );
  }
}

export default LoginPage;
