import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {fetchFixtures} from '../../../actions';
import MatchSummary from '../../ui/MatchSummary';

class Fixtures extends Component {
  static teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  componentDidMount() {
    this.props.fetchFixtures(this.props.competition.id);
  }

  render() {
    const {fixtures, teams, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    return (
      <div>
        <h1>Fixtures</h1>
        <div>
          {fixtures.map((f) => {
            const obj = {
              ...f,
              awayTeam: Fixtures.teamByName(teams, f.awayTeamName),
              homeTeam: Fixtures.teamByName(teams, f.homeTeamName),
            };
            return <MatchSummary key={`match-${f._links.self.href}`} {...obj} />;
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
  fetchFixtures: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({
      fixtures: state.fixtures.fixtures,
      competition: state.competition.competition,
      teams: state.teams.teams,
      loading: state.fixtures.loading,
    }),
    {fetchFixtures},
  )(Fixtures),
);
