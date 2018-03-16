import React, { Component } from 'react';
import './App.css';
import x from './assets/x.jpg';
import Main from './layout/Main';
import Header from './layout/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Main />
        </div>
        
        {/* <br /><br /><img src={x} alt='x' width='600px' /> */}
      </div>
    );
  }
}

export default App;
