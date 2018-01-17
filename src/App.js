import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Competitions from './components/pages/Competitions';
import Competition from './components/pages/Competition/index';

const styles = {
  container: {
    marginTop: '64px',
    marginBottom: '96px'
  },
};

class App extends Component {
  render() {
    return (
      <div style={styles.container} className="ui container">
        <Route path="/" exact component={HomePage} />
        <Route path="/competitions" exact component={Competitions} />
        <Route path="/competitions/:id" component={Competition} />
        { /* <Redirect path="*" to="/" /> */ }
        <footer>
          <p>Hand made with <span role="img" aria-label="heart">💛</span> by Gopal Adhikari</p>
        </footer>
      </div>
    );
  }
}

export default App;
