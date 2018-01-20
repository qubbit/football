import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { fetchFixtures, navigateToPage } from '../../../actions';
import MatchSummary from '../../ui/MatchSummary';
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

  render() {
    const { fixtures, teams, loading, matchDay } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <div className="matchday-controls">
          <h2>Match day {this.props.matchDay}</h2>
          <h2>Fixtures</h2>
          <span>
            <button
              className="matchday-nav-button"
              title='Go to prev match day'
              onClick={() => this.goToMatchday(-1)}>
              <Icon size="large" name="chevron left" />
              <span>Previous</span>
            </button>
            <button
              className="matchday-nav-button"
              title='Go to current match day'
              onClick={() => this.goToMatchday(null)}>
              <Icon size="large" name="dot circle outline" />
            </button>
            <button
              className="matchday-nav-button"
              title='Go to next match day'
              onClick={() => this.goToMatchday(1)}>
              <span>Next</span>
              <Icon size="large" name="chevron right" />
            </button>
          </span>
        </div>
        <div>
          {fixtures.map(f => {
            const obj = {
              ...f,
              awayTeam: Fixtures.teamByName(teams, f.awayTeamName),
              homeTeam: Fixtures.teamByName(teams, f.homeTeamName)
            };
            return (
              <MatchSummary key={`match-${f._links.self.href}`} {...obj} />
            );
          })}
        </div>
      </div>
    );
  }
}

Fixtures.propTypes = {
  fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
  competition: PropTypes.shape({ id: PropTypes.int }).isRequired,
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
