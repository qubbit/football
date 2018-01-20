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
    const maxMatchDays = this.props.competition.numberOfMatchdays;
    const newMatchDay = Math.min(
      Math.max(numDays + this.props.matchDay, 1),
      maxMatchDays
    );
    const params = { matchday: newMatchDay };
    this.props.fetchFixtures(this.props.competition.id, params);
  };

  render() {
    const { fixtures, teams, loading, matchDay } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <div className="matchday-controls">
          <button
            className="ui icon button prev-day"
            onClick={() => this.goToMatchday(-1)}>
            <Icon size="large" name="arrow left" />
          </button>
          <h2>Fixtures</h2>
          <button
            className="ui icon button next-day"
            onClick={() => this.goToMatchday(1)}>
            <Icon size="large" name="arrow right" />
          </button>
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
