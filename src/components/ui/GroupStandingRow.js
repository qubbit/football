import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  crest: {
    borderRadius: 0
  }
};

class GroupStandingRow extends React.Component {
  render() {
    const {
      standing: { record },
      standings
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell>
          <Image
            className="standing-team-flag"
            avatar
            src={
              standings.abbreviation === 'WC'
                ? this.props.standing.countryFlag
                : this.props.standing.logo
            }
            size="mini"
            style={styles.crest}
          />{' '}
          <span className="standing-team-name">
            {this.props.standing.customName || this.props.standing.name}
          </span>
        </Table.Cell>
        <Table.Cell>{record.gamesPlayed}</Table.Cell>
        <Table.Cell>{record.wins}</Table.Cell>
        <Table.Cell>{record.ties}</Table.Cell>
        <Table.Cell>{record.losses}</Table.Cell>
        <Table.Cell>{record.goals}</Table.Cell>
        <Table.Cell>{record.goalsAgainst}</Table.Cell>
        <Table.Cell>{record.goals - record.goalsAgainst}</Table.Cell>
        <Table.Cell>{record.points}</Table.Cell>
      </Table.Row>
    );
  }
}

GroupStandingRow.propTypes = {
  standing: PropTypes.shape({
    team: PropTypes.string.isRequired,
    crestURI: PropTypes.string.isRequired,
    playedGames: PropTypes.number.isRequired,
    wins: PropTypes.number,
    draws: PropTypes.number,
    losses: PropTypes.number,
    goals: PropTypes.number.isRequired,
    goalsAgainst: PropTypes.number.isRequired,
    goalDifference: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired
};

export default connect(state => ({ standings: state.standings.standings }), {})(
  GroupStandingRow
);
