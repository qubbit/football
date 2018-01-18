import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchFixtures, navigateToPage } from '../../../actions';
import MatchSummary from '../../ui/MatchSummary';
import Loader from '../../ui/Loader';

class Fixtures extends Component {
  static teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  componentDidMount() {
    this.props.fetchFixtures(
      this.props.competition.id || this.props.match.params.id
    );
    this.props.navigateToPage('fixtures');
  }

  render() {
    const { fixtures, teams, loading } = this.props;

    if (loading) {
      return <Loader/>;
    }

    return (
      <div>
        <h2 className="page-title">Fixtures</h2>
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
      loading: state.fixtures.loading
    }),
    { fetchFixtures, navigateToPage }
  )(Fixtures)
);
