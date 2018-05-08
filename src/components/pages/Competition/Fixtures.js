import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { fetchFixtures, navigateToPage } from '../../../actions';
import Fixture from '../../ui/Fixture';
import Loader from '../../ui/Loader';

class Fixtures extends Component {
  static teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  componentDidMount() {
    const params = { matchday: this.props.competition.currentMatchday };
    this.props.fetchFixtures(
      this.props.competition.id || this.props.match.params.id,
      params
    );
    this.props.navigateToPage('fixtures');
  }

  goToMatchday = numDays => {
    const { competition } = this.props;
    if (numDays === null) {
      const params = { matchday: competition.currentMatchday };
      this.props.fetchFixtures(competition.id, params);
      return;
    }

    const oldMatchDay = this.props.matchDay;
    const maxMatchDays = competition.numberOfMatchdays;
    const newMatchDay = Math.min(
      Math.max(numDays + oldMatchDay, 1),
      maxMatchDays
    );

    if (oldMatchDay === newMatchDay) return;

    const params = { matchday: newMatchDay };
    this.props.fetchFixtures(competition.id, params);
  };

  renderDay(fixtures) {
    const t = this.props.teams;
    return fixtures.map(f => {
      const obj = {
        ...f,
        awayTeam: Fixtures.teamByName(t, f.awayTeamName),
        homeTeam: Fixtures.teamByName(t, f.homeTeamName)
      };
      return <Fixture key={`match-${f._links.self.href}`} {...obj} />;
    });
  }

  render() {
    const { fixtures, teams, loading, matchDay } = this.props;

    if (loading) {
      return <Loader />;
    }

    // Group fixtures by day
    const g = _.chain(fixtures)
      .groupBy(f => moment(f.date).format('MM-DD-YYYY'))
      .value();

    return (
      <div style={{ width: '100%' }}>
        <div className="matchday-controls">
          <h2>Match day {this.props.matchDay}</h2>
          <h2>Fixtures</h2>
          <span>
            <button
              className="matchday-nav-button"
              title="Go to prev match day"
              onClick={() => this.goToMatchday(-1)}>
              <Icon size="large" name="chevron left" />
              <span>Previous</span>
            </button>
            <button
              className="matchday-nav-button"
              title="Go to current match day"
              onClick={() => this.goToMatchday(null)}>
              <Icon size="large" name="dot circle outline" />
            </button>
            <button
              className="matchday-nav-button"
              title="Go to next match day"
              onClick={() => this.goToMatchday(1)}>
              <span>Next</span>
              <Icon size="large" name="chevron right" />
            </button>
          </span>
        </div>
        <div className="fixture-list">
          {Object.keys(g).map(x => [
            <div key={x} className="match-fixture match-fixture-header">
              { /* Since in the groupBy we used MM-DD-YY format to parse
              the date, we need use the same format here to convert it into
              a moment date object */ }
              <div>{moment(x, 'MM-DD-YYYY').format('dddd MMMM Do')}</div>
            </div>,
            this.renderDay(g[x])
          ])}
        </div>
      </div>
    );
  }
}

Fixtures.propTypes = {
  fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
  competition: PropTypes.shape({ id: PropTypes.number }).isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchFixtures: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    state => ({
      fixtures: state.fixtures.fixtures,
      competition: state.competition.competition,
      teams: state.teams.teams,
      loading: state.fixtures.loading,
      matchDay: state.fixtures.matchDay
    }),
    { fetchFixtures, navigateToPage }
  )(Fixtures)
);
