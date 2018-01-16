import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Competitions from './components/pages/Competitions';
import Competition from './components/pages/Competition';
// import Fixtures from './components/pages/Competition/Fixtures';
// import Standings from './components/pages/Competition/Standings';

const styles = {
  container: {
    color: '#fff',
  },
};

class App extends Component {
  render() {
    return (
      <div style={styles.container} className="ui container">
        <Route path="/" exact component={HomePage} />
        <Route path="/competitions" exact component={Competitions} />
        <Route path="/competitions/:id" exact component={Competition} />
        { /* <Route path="/competitions/:id/fixtures" exact component={Fixtures} /> */ }
        { /* <Redirect path="*" to="/" /> */ }
      </div>
    );
  }
}

export default App;
