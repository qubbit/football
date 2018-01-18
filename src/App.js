import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Competitions from './components/pages/Competitions';
import CompetitionsMenu from './components/pages/CompetitionsMenu';
import Competition from './components/pages/Competition/index';
import Roster from './components/pages/Team/Roster';

const Aux = props => props.children;

class App extends Component {
  render() {
    return (
      <Aux>
        <CompetitionsMenu />
        <div className='main-container'>
          <Route path="/competitions/:id" component={Competition} />
          <Route path="/competitions" exact component={Competitions} />
          <Route path="/teams/:id/roster" component={Roster} />
        </div>
      </Aux>
    );
  }
}
export default App;
