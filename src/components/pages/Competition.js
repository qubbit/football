import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchFixtures, fetchTeams } from "../../actions";
import Match from "../cards/Match";
import MatchSummary from "../ui/MatchSummary";

class Competition extends Component {
  componentWillMount() {
    const { match: { params } } = this.props;
    this.props.fetchFixtures(params.id);
    this.props.fetchTeams(params.id);
  }

  teamByName(teams, name) {
    return teams.find(t =>  t.name === name);
  }

  render() {
    const { fixtures, teams } = this.props;

    return <div>
      <h1>Fixtures</h1>
      <div>{ fixtures.map(f => {
        const obj = {...f,
          awayTeam: this.teamByName(teams, f.awayTeamName),
          homeTeam: this.teamByName(teams, f.homeTeamName)
        }
        return <MatchSummary {...obj} />
      })
      }</div>
    </div>;
  }
}

export default connect(
  (state) => ({
    fixtures: state.competitions.fixtures,
    teams: state.teams.teams
  }), { fetchFixtures, fetchTeams }
)(Competition);
