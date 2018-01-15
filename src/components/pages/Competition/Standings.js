import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStandings} from '../../../actions';
import StandingRow from '../../ui/StandingRow';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';

class Standings extends Component {
  componentDidMount() {
    this.props.fetchStandings(this.props.competition.id);
  }

  teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  render() {
    const {standings, teams} = this.props;
    const rows = standings.map((f, i) => {
      return <StandingRow key={`standing-${i}`} standing={f} />;
    });

    return (
      <div>
        <h1>Standings</h1>
        <Table size='large' selectable basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Club</Table.HeaderCell>
              <Table.HeaderCell>MP</Table.HeaderCell>
              <Table.HeaderCell>W</Table.HeaderCell>
              <Table.HeaderCell>D</Table.HeaderCell>
              <Table.HeaderCell>L</Table.HeaderCell>
              <Table.HeaderCell>GF</Table.HeaderCell>
              <Table.HeaderCell>GA</Table.HeaderCell>
              <Table.HeaderCell>GD</Table.HeaderCell>
              <Table.HeaderCell>Points</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    );
  }
}

Standings.propTypes = {
  standings: PropTypes.array.isRequired,
  competition: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchStandings: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    standings: state.standings.standings,
    competition: state.competition.competition,
    teams: state.teams.teams,
    loading: state.competitions.loading,
  }),
  {fetchStandings},
)(Standings);
