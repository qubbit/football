import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Loader } from 'semantic-ui-react';
import { fetchStandings, navigateToPage } from '../../../actions';
import StandingRow from '../../ui/StandingRow';
import UEFAStandingRow from '../../ui/UEFAStandingRow';

class Standings extends Component {
  componentDidMount() {
    this.props.fetchStandings(this.props.competition.id);
    this.props.navigateToPage('standings');
  }

  render() {
    const { competition, standings, loading } = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    let rows;
    if (competition.league === 'CL') {
      rows = [];
      for (const entry of Object.entries(standings)) {
        const group = entry[0];
        const groupStandings = entry[1];

        const row = groupStandings.map(f => {
          const key = `standing-${group}-${f.teamName || f.team}`;
          return <UEFAStandingRow key={key} standing={f} />;
        });
        rows.push(row);
      }
    } else {
      rows = standings.map(f => (
        <StandingRow key={`standing-${f.teamName}`} standing={f} />
      ));
    }

    return (
      <div>
        <h2 className="page-title">Standings</h2>
        <Table size="large" selectable basic="very">
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
  standings: PropTypes.any.isRequired,
  competition: PropTypes.shape({ id: PropTypes.int }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchStandings: PropTypes.func.isRequired
};
export default connect(
  state => ({
    standings: state.standings.standings,
    competition: state.competition.competition,
    loading: state.standings.loading
  }),
  { fetchStandings, navigateToPage }
)(Standings);
