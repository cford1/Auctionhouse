import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
  
} from 'react-router-dom';


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
        <div className="ListContainer" id="Items">
          <h1>Items</h1>
          <table>
            <tbody>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Current Price</th>
  
            </tr>
            
            {this.state.items.map(item => {
              return <tr>
                <td key={'items-${item.name}'}>{item.name}</td> 
                <td key={'items-${item.itemId}'}>{item.itemId}</td>
                <td key={'items-${item.value}'}>${item.value}</td>
              </tr>
            })}
          </tbody>
          </table>
        </div>
        
      );
    }
  }
  
  
  class BuyersContainer extends Component {
    constructor() {
      super();
      this.state = {
        buyers: []
      };
    }
  
    componentDidMount() {
      fetch('http://localhost:3000/api/org.quick.auction.Buyer')
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({buyers: data}))
    }
  
    render() {
      return (
        <div className="ListContainer" id="Buyers">
          <h1>Buyers</h1>
          <table>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Email</th>
            </tr>
            
              {this.state.buyers.map(buyer => {
                return <tr>
                  <td key={'buyers-${buyer.name}'}>{buyer.name}</td>
                  <td key={'buyers-${buyer.email}'}>{buyer.email}</td>
                </tr>
              })}
          </tbody>
          </table>
        </div>
        
      );
    }
  }

  class BlockchainContainer extends Component {
    render() {
      return (
        <div className="BlockchainContainer">
          <p>Registry Info</p>
          <ItemsContainer/>
          <BuyersContainer/>
        </div>
        
      );
    }
  }

  export default BlockchainContainer;