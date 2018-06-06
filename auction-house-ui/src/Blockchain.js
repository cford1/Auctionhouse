import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,

} from 'react-router-dom';

var interval = 3000;

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
      .then(data => this.setState({ items: data }))
    setInterval(() => {
      fetch('http://localhost:3000/api/org.quick.auction.Item')
        .then(results => {
          return results.json()
        })
        .then(data => this.setState({ items: data }))
    }, interval)
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
    fetch('http://localhost:3000/api/org.quick.auction.Buyer')
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ buyers: data }))
    setInterval(() => {
      fetch('http://localhost:3000/api/org.quick.auction.Buyer')
        .then(results => {
          return results.json()
        })
        .then(data => this.setState({ buyers: data }))
    }, interval)
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
    fetch('http://localhost:3000/api/org.quick.auction.Item?filter=%7B%22where%22%3A%20%7B%22status%22%3A%22BEING_AUCTIONED%22%7D%7D')
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ items: data }))
    setInterval(() => {
      fetch('http://localhost:3000/api/org.quick.auction.Item?filter=%7B%22where%22%3A%20%7B%22status%22%3A%22BEING_AUCTIONED%22%7D%7D')
        .then(results => {
          return results.json()
        })
        .then(data => this.setState({ items: data }))
    }, interval)
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

class TransactionContainer extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/system/historian')
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ transactions: data }))
    setInterval(() => {
      fetch('http://localhost:3000/api/system/historian')
        .then(results => {
          return results.json()
        })
        .then(data => this.setState({ transactions: data }))
    }, interval)
  }

  render() {
    return (
      <div className="ListContainer" id="Transactions">
        <h1>Transaction Log</h1>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Timestamp</th>
            </tr>

            {this.state.transactions.map(transaction => {
              return <tr>
                <td key={'transactions-${transaction.transactionType}'}>{transaction.transactionType.substring(transaction.transactionType.lastIndexOf(".") + 1)}</td>
                <td key={'transactions-${transaction.transactionTimestamp'}>{transaction.transactionTimestamp}</td>
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
        <ItemsContainer />
        <BuyersContainer />
        <MarketplaceContainer />
        <TransactionContainer />
      </div>

    );
  }
}

export default BlockchainContainer;