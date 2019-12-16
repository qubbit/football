import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import CompetitionsMenu from './components/pages/CompetitionsMenu';
import { routes } from './routes/index.ts';
import { fetchCompetition } from './actions/index.js';
import { getParams } from './routes/route_helper';

const Aux = props => props.children;

class App extends Component {
  async componentDidMount() {
    const { competition, fetchCompetition } = this.props;
    const competitionShortName = getParams(this.props, 'id');

    if (!competition && competitionShortName) {
      await fetchCompetition(competitionShortName);
    }
  }

  componentWillReceiveProps() {
    // TODO: Find a better alternative to this hack
    const {
      history: {
        location: { pathname }
      },
      appSettings
    } = this.props;

    if (pathname.match(/^\/competitions\/\w+$/)) {
      const activePageLocation = `${pathname}/${appSettings.activeMenuItem}`;
      this.props.history.push(activePageLocation);
    }
  }

  render() {
    const { competition } = this.props;
    const style =
      competition && competition.id
        ? null
        : {
            backgroundImage: 'url(/assets/images/patrick-schneider-379251.jpg)'
          };

    return (
      <Aux>
        <CompetitionsMenu current={competition} />
        <div className="main-container" style={style}>
          {routes.map(route => (
            <Route
              path={route.path}
              component={route.component}
              {...route.props}
            />
          ))}
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
    { fetchCompetition }
  )(App)
);
