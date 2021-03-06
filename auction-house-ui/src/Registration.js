import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,

} from 'react-router-dom';
import { BusinessNetworkConnection } from 'composer-client';

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

class RegEntryFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      accountBalance: "",
      status: "",
      street: "",
      city: "",
      st: "",
      zip: ""
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    return fetch('http://localhost:3000/api/org.quick.auction.AddBusiness', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "org.quick.auction.AddBusiness",
        "email": this.state.email,
        "name": this.state.name,
        "accountBalance": this.state.accountBalance,
        "address": {
          "$class": "org.quick.auction.Address",
          "street": this.state.street,
          "city": this.state.city,
          "state": this.state.st,
          "zip": this.state.zip,
        },
        "status": this.state.status,
        "transactionId": "",
        "timestamp": (new Date()).toISOString()
      }),
    }).then(() => {
      return fetch('http://localhost:3000/api/system/identities/issue', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "participant": "resource:org.quick.auction." + this.state.status + "#" + this.state.email,
          "userID": this.state.email,
          "options": {}
        }
        ),
      });
    });

    this.setState({
      name: "",
      email: "",
      accountBalance: "",
      status: "",
      street: "",
      city: "",
      st: "",
      zip: ""
    });
    this.props.history.push("/blockchain");
  }

  render() {
    return (
      <div className="RegFields">
        <div className="UserPass">
          <p>Name:</p>
          <input type="text" name="name" onChange={this.handleChange} />
          <p>Email:</p>
          <input type="text" name="email" onChange={this.handleChange} />
          <p>Account balance:</p>
          <input type="text" name="accountBalance" onChange={this.handleChange} />
          <p>Buyer/Seller:</p>
          <input type="text" name="status" onChange={this.handleChange} />
        </div>
        <div className="Address">
          <p>Street Address:</p>
          <input type="text" name="street" onChange={this.handleChange} />
          <p>City:</p>
          <input type="text" name="city" onChange={this.handleChange} />
          <p>State:</p>
          <input type="text" name="st" onChange={this.handleChange} />
          <p>Zip:</p>
          <input type="text" name="zip" onChange={this.handleChange} />
        </div>
        <br />
        <input class="Reg-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

class RegistrationPage extends Component {
  render() {
    return (
      <div className="RegistrationPage">
        <div className="Register">
          <Header />
          <RegEntryFields />
        </div>
      </div>
    );
  }
}

export default RegistrationPage;