import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import Foundation from 'react-foundation';

class App extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })
  }

  render() {
    console.log(this.state.categories);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Readable</h2>
        </div>
        <div className="row">
          <div className="column small-4"></div>
          <div className="column small-8"></div>
        </div>
      </div>
    );
  }
}

export default App;
