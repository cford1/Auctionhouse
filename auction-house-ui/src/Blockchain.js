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
        setInterval( () => {
            fetch('http://localhost:3000/api/org.quick.auction.Item')
            .then(results => {
                return results.json()
            })
            .then(data => this.setState({items: data}))
        }, 5000)
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
              <th>Value</th>
  
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
        setInterval( () => {
            fetch('http://localhost:3000/api/org.quick.auction.Buyer')
            .then(results => {
                return results.json()
            })
            .then(data => this.setState({buyers: data}))
        }, 5000)
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

  class MarketplaceContainer extends Component {
    constructor() {
        super();
        this.state = {
          items: []
        };
      }
    
      componentDidMount() {
        setInterval( () => {
            fetch('http://localhost:3000/api/org.quick.auction.Item?filter=%7B%22where%22%3A%20%7B%22status%22%3A%22BEING_AUCTIONED%22%7D%7D')
            .then(results => {
            return results.json()
            })
            .then(data => this.setState({items: data}))
        }, 5000)
      }
    
      render() {
        return (
          <div className="ListContainer" id="Marketplace">
            <h1>Up for Auction</h1>
            <table>
              <tbody>
              <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Current Value</th>
              <th>Contact</th>
              </tr>
              
                {this.state.items.map(item => {
                  return <tr>
                    <td key={'items-${item.name}'}>{item.name}</td>
                    <td key={'items-${item.itemId}'}>{item.itemId}</td>
                    <td key={'items-${item.value}'}>${item.value}</td>
                    <td key={'items-${item.owner}'}>{item.owner.substring(33)}</td>
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
          <MarketplaceContainer/>
        </div>
        
      );
    }
  }

  export default BlockchainContainer;