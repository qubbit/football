import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Competitions from './components/pages/Competitions';

class App extends Component {
  render() {
    return (<div className='ui container'>
      <Route path="/" exact component={HomePage} />
      <Route path="/competitions" exact component={Competitions} />
    </div>);
  }
}

export default App;
