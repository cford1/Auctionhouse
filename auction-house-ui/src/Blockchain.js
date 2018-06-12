import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,

} from 'react-router-dom';

var interval = 1000;

class RequestAuctionButton extends Component {
  constructor() {
    super();

    this.handleRequestAuction = this.handleRequestAuction.bind(this);
  }

  handleRequestAuction() {
    var item = this.props.value;
    fetch('http://localhost:3000/api/org.quick.auction.RequestAuction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "org.quick.auction.RequestAuction",
        "auctioner": "resource:org.quick.auction.Auctioner#auctioner@email.com",
        "seller": "resource:org.quick.auction.Seller#" + item[1].substring(item[1].indexOf("#") + 1),
        "item": "resource:org.quick.auction.Item#" + item[0],
        "transactionId": "",
        "timestamp": (new Date()).toISOString()
      })
    })
  }


  render() {
    if (this.props.value[2] === "NEW") {
      return (
        <button onClick={this.handleRequestAuction}>Request Auction</button>
      );
    } else {
      return null;
    }
  }
}

class AddItemForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      price: "",
      owner: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify({
      "$class": "org.quick.auction.AddItem",
      "itemId": this.state.id,
      "name": this.state.name,
      "value": this.state.value,
      "owner": "resource:org.quick.auction.Seller#" + this.state.owner,
      "transactionId": "",
      "timestamp": (new Date()).toISOString()
    }));

    fetch('http://localhost:3000/api/org.quick.auction.AddItem', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "org.quick.auction.AddItem",
        "name": this.state.name,
        "itemId": this.state.id,
        "value": this.state.price,
        "owner": "resource:org.quick.auction.Seller#" + this.state.owner,
        "transactionId": "",
        "timestamp": (new Date()).toISOString()
      }),
    })
  }

  render() {
    return (
      <div className="ItemFields">
        <p>Item Name:</p>
        <input type="text" name="name" onChange={this.handleChange} />
        <p>Item ID:</p>
        <input type="text" name="id" onChange={this.handleChange} />
        <p>Price:</p>
        <input type="text" name="price" onChange={this.handleChange} />
        <p>Owner Email:</p>
        <input type="text" name="owner" onChange={this.handleChange} />
        <br />
        <input class="Item-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
      </div>

    );
  }

}



class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
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
      <div className="ListContainer" id="Items" >
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
                <td><RequestAuctionButton value={[item.itemId, item.owner, item.status]} /></td>
              </tr>
            })}
          </tbody>
        </table>
        <AddItemForm />
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

class BidButton extends Component {
  constructor() {
    super();
    this.state = {
      bidAmount: "",
      buyer: "",
      itemId: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify({
      "$class": "org.quick.auction.Bid",
      "bidAmount": this.state.bidAmount,
      "item": "resource:org.quick.auction.Item#" + this.state.itemId,
      "auctioner": "resource:org.quick.auction.Auctioner#auctioner@email.com",
      "bidder": "resource:org.quick.auction.Buyer#" + this.state.buyer,
      "transactionId": "",
      "timestamp": (new Date()).toISOString()
    }));

    fetch('http://localhost:3000/api/org.quick.auction.Bid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "org.quick.auction.Bid",
        "bidAmount": this.state.bidAmount,
        "item": "resource:org.quick.auction.Item#" + this.state.itemId,
        "auctioner": "resource:org.quick.auction.Auctioner#auctioner@email.com",
        "bidder": "resource:org.quick.auction.Buyer#" + this.state.buyer,
        "transactionId": "",
        "timestamp": (new Date()).toISOString()
      }),
    })
  }

  render() {
    return (
      <div className="BidFields">
        <p>Bid Amount:</p>
        <input type="text" name="bidAmount" onChange={this.handleChange} />
        <p>Buyer Email:</p>
        <input type="text" name="buyer" onChange={this.handleChange} />
        <p>Item ID:</p>
        <input type="text" name="itemId" onChange={this.handleChange} />
        <br />
        <input class="Bid-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
      </div>

    );
  }

}

class AcceptBidButton extends Component {
  constructor() {
    super();
    this.state = {
      seller: "",
      itemId: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify({
      "$class": "org.quick.auction.AcceptBid",
      "seller": "resource:org.quick.auction.Seller#" + this.state.seller,
      "auctioner": "resource:org.quick.auction.Auctioner#auctioner@email.com",
      "item": "resource:org.quick.auction.Item#" + this.state.itemId,
      "transactionId": "",
      "timestamp": (new Date()).toISOString()
    }));

    fetch('http://localhost:3000/api/org.quick.auction.AcceptBid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "$class": "org.quick.auction.AcceptBid",
        "seller": "resource:org.quick.auction.Seller#" + this.state.seller,
        "auctioner": "resource:org.quick.auction.Auctioner#auctioner@email.com",
        "item": "resource:org.quick.auction.Item#" + this.state.itemId,
        "transactionId": "",
        "timestamp": (new Date()).toISOString()
      }),
    })
  }

  render() {
    return (
      <div className="AcceptBidFields">
        <p>Accept Bid:</p>
        <p>Seller Email:</p>
        <input type="text" name="seller" onChange={this.handleChange} />
        <p>Item ID:</p>
        <input type="text" name="itemId" onChange={this.handleChange} />
        <br />
        <input class="AcceptBid-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit.bind(this)} onSubmit={this.handleSubmit.bind(this)} />
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
        .then(fetch('http://localhost:3000/api/org.quick.auction.Auctioner')

        )
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
                <td key={'items-${item.value}'}>${item.marketValue}</td>
                <td key={'items-${item.owner}'}>{item.owner.substring(item.owner.indexOf("#") + 1)}</td>
              </tr>
            })}
          </tbody>
        </table>
        <BidButton />
        <AcceptBidButton />
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