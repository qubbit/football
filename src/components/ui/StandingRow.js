import React from 'react';
import {Table, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const styles = {
  crest: {
    borderRadius: 0,
  },
};

const StandingRow = props => {
  const {standing: {record}} = props;
  return (
    <Table.Row>
      <Table.Cell>
        <span
          style={{
            height: '100%',
            marginRight: '20px',
            marginLeft: '10px',
            display: 'inline-block',
          }}>
          {record.rank}
        </span>
        <Image
          avatar
          src={props.standing.crestURI}
          size="mini"
          style={styles.crest}
        />{' '}
        <span style={{marginLeft: '10px'}}>{props.standing.customName || props.standing.name}</span>
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
    points: PropTypes.number.isRequired,
  }).isRequired,
};

export default StandingRow;
