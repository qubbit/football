import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchFixtures } from "../../../actions";
import MatchSummary from "../../ui/MatchSummary";
import { Loader } from 'semantic-ui-react';

class Fixtures extends Component {
  componentDidMount() {
    this.props.fetchFixtures(this.props.competition.id);
  }

  teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  render() {
    const { fixtures, teams, loading } = this.props;

    if(loading) {
      return <Loader size='large'>Loading...</Loader>
    }

    return <div><h1>Fixtures</h1>
      <div>{ fixtures.map((f, i) => {
        const obj = {...f,
          awayTeam: this.teamByName(teams, f.awayTeamName),
          homeTeam: this.teamByName(teams, f.homeTeamName)
        }
      return <MatchSummary key={`match-${i}`} {...obj} />
      })}
      </div>
  </div>;
  }
}

export default connect(
  (state) => ({
    fixtures: state.competitions.fixtures,
    competition: state.competitions.activeCompetition,
    teams: state.teams.teams,
    loading: state.competitions.loading
  }), { fetchFixtures }
)(Fixtures);
