import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const styles = {
  crest: {
    borderRadius: 0
  }
};

const GroupStandingRow = props => {
  const {
    standing: { record }
  } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <Image avatar src="" size="mini" style={styles.crest} />{' '}
        <span style={{ marginLeft: '10px' }}>
          {props.standing.customName || props.standing.name}
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
};

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

export default GroupStandingRow;
