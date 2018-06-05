import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
  
} from 'react-router-dom';

class AboutPage extends Component {
    render(){
      return (
        <div className="About">
          <p>This is a demo of how we can use Hyperledger Fabric to implement a blockchain.</p>
        </div>
      );
    }
  }


  export default AboutPage;