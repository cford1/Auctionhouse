import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
  
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Client from './client'


import BusinessNetworkConnection from 'composer-client';


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
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event){
    this.setState({username: event.target.value});
  }
  handlePassChange(event){
    this.setState({password: event.target.value});
  }
  handleSubmit(event){
    this.setState({username: "", password: ""});
    event.preventDefault();
  }

  render() {
    return (
      <div className="LoginField">
        <p>Username:</p>
        <input type="text" onChange={this.handleUserChange}/>
        <p>Password:</p>
        <input type="text" onChange={this.handlePassChange} onSubmit={this.handleSubmit}/>
        <br/>
        <input class="Login-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit}/>
      </div>
    );
  }
}

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state= { isAuthenticated: false };
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  render() {
    return (
      <div className="LoginPage">
        <Header/>
        <div className="Login">
          <LoginText/>
          <LoginEntryFields/>
        </div>
      </div>
    );
  }
}

class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/org.quick.auction.Item')
    .then(results => {
      return results.json()
    })
    .then(data => this.setState({items: data}))
  }

  render() {
    return (
      <div className="Items">
        <h1>Items</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Current Price</th>

          </tr>
          
          {this.state.items.map(item => {
            return <tr>
              <td key={'items-${item.itemId}'}>{item.name}</td> 
              <td>{item.itemId}</td>
              <td>${item.value}</td>
            </tr>
          })}
          
        </table>
      </div>
      
    );
  }
}

class BlockchainContainer extends Component {
  render() {
    return (
      <div className="BlockchainContainer">
        <p>Blockchain Info</p>
        <ItemsContainer/>
      </div>
      
    );
  }
}

class AboutPage extends Component {
  render(){
    return (
      <div className="About">
        <p>This is a demo of how we can use Hyperledger Fabric to implement a blockchain.</p>
      </div>
    );
  }
}

class App extends Component {
  render(){
    return (
      <div className="Page">
      <div className="Nav">
        <ul>
          <li><Link to="/">Login/Register</Link></li>
          <li><Link to="/blockchain">Blockchain</Link></li>
          <li><Link to="/about">About</Link></li>          
        </ul>
        </div>

        <Route path="/" exact component={LoginPage}/>
        <Route path="/blockchain" exact component={BlockchainContainer}/>
        <Route path="/about" exact component={AboutPage}/>
      </div>
    );
  }
}






export default App;
