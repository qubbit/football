import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStandings } from "../../../actions";
import MatchSummary from "../../ui/MatchSummary";
import PropTypes from 'prop-types';

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

Standings.propTypes = {
  standings      : PropTypes.array.isRequired,
  competition    : PropTypes.object.isRequired,
  teams          : PropTypes.array.isRequired,
  loading        : PropTypes.bool.isRequired,
  fetchStandings : PropTypes.func.isRequired
}
export default connect(
  (state) => ({
    standings: state.competitions.standings,
    competition: state.competitions.currentCompetition,
    teams: state.teams.teams,
    loading: state.competitions.loading
  }), { fetchStandings }
)(Standings);
