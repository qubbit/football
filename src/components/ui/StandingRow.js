import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  crest: {
    borderRadius: 0
  }
};

class StandingRow extends React.Component {
  render() {
    const {
      standing: { record },
      standings,
      teams
    } = this.props;

    const team = teams.find(t => t.id === this.props.standing.id);
    const logoUrl = team ? team.links.logos.Small : '';

    return (
      <Table.Row>
        <Table.Cell collapsing>
          <span
            style={{
              height: '100%',
              marginRight: '20px',
              marginLeft: '10px',
              display: 'inline-block'
            }}>
            {record.rank}
          </span>
          <Image
            avatar
            src={logoUrl}
            size="mini"
            style={styles.crest}
          />{' '}
          <span style={{ marginLeft: '10px' }}>
            {this.props.standing.customName || this.props.standing.name}
          </span>
        </Table.Cell>
        <Table.Cell collapsing>{record.gamesPlayed}</Table.Cell>
        <Table.Cell collapsing>{record.wins}</Table.Cell>
        <Table.Cell collapsing>{record.ties}</Table.Cell>
        <Table.Cell collapsing>{record.losses}</Table.Cell>
        <Table.Cell collapsing>{record.goals}</Table.Cell>
        <Table.Cell collapsing>{record.goalsAgainst}</Table.Cell>
        <Table.Cell collapsing>{record.goals - record.goalsAgainst}</Table.Cell>
        <Table.Cell collapsing>{record.points}</Table.Cell>
      </Table.Row>
    );
  }
}

StandingRow.propTypes = {
  standing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    customName: PropTypes.string.isRequired,
    record: PropTypes.shape({ rank: PropTypes.number.isRequired }),
    gamesPlayed: PropTypes.number.isRequired,
    wins: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    goals: PropTypes.number.isRequired,
    goalsAgainst: PropTypes.number.isRequired,
    goalDifference: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired
};

export default connect(
  state => ({ teams: state.teams.teams, standings: state.standings.standings }),
  {}
)(StandingRow);
