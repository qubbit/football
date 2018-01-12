import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Competitions from './components/pages/Competitions';
import Competition from './components/pages/Competition';

const styles = {
  container: {
    color: '#fff'
  }
}

class App extends Component {
  render() {
    return (<div style={styles.container} className='ui container'>
      <Route path="/" exact component={HomePage} />
      <Route path="/competitions" exact component={Competitions} />
      <Route path="/competitions/:id/:page?" exact component={Competition} />
    </div>);
  }
}

export default App;
