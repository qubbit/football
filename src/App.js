import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';

class App extends Component {
  render() {
    return (<div className='ui container'>
      <Route path="/" exact component={HomePage} />
    </div>);
  }
}

export default App;
