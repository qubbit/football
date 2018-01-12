import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStandings, fetchTeams } from "../../../actions";
import MatchSummary from "../../ui/MatchSummary";

class Standings extends Component {
  componentDidMount() {
    this.props.fetchStandings(this.props.competition.id);
  }

  teamByName(teams, name) {
    return teams.find(t =>  t.name === name);
  }

  render() {
    const { standings, teams } = this.props;

    return <div><h1>Standings</h1>
      <div>{ standings.map((f, i) => {
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
    standings: state.competitions.standings,
    competition: state.competitions.activeCompetition,
    teams: state.teams.teams
  }), { fetchStandings, fetchTeams }
)(Standings);
