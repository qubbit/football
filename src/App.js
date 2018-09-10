import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import CompetitionsMenu from './components/pages/CompetitionsMenu';
import Competition from './components/pages/Competition/index';
import Roster from './components/pages/Team/Roster';

const Aux = props => props.children;

class App extends Component {
  componentWillReceiveProps() {
    // TODO: Find a better alternative to this hack
    const { history: { location: { pathname } }, appSettings } = this.props;
    if (pathname.match(/^\/competitions\/\w+$/)) {
      const activePageLocation = `${pathname}/${appSettings.activeMenuItem}`;
      this.props.history.push(activePageLocation);
    }
  }

  render() {
    const style = this.props.competition.id
      ? null
      : { backgroundImage: 'url(/assets/images/patrick-schneider-379251.jpg)' };

    return (
      <Aux>
        <CompetitionsMenu />
        <div className="main-container" style={style}>
          <Route path="/competitions/:id" component={Competition} />
          <Route path="/teams/:fe_id/:id/roster" component={Roster} />
        </div>
      </Aux>
    );
  }
}
export default withRouter(
  connect(
    state => ({
      competition: state.competition.competition,
      appSettings: state.application
    }),
    {}
  )(App)
);
