import React from 'react';
import {Table, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const styles = {
  crest: {
    borderRadius: 0,
  },
};

const StandingRow = props => {
  const {standing} = props;
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
          {standing.position}
        </span>
        <Image
          avatar
          src={standing.crestURI}
          size="mini"
          style={styles.crest}
        />{' '}
        <span style={{marginLeft: '10px'}}>{standing.teamName}</span>
      </Table.Cell>
      <Table.Cell>{standing.playedGames}</Table.Cell>
      <Table.Cell>{standing.wins}</Table.Cell>
      <Table.Cell>{standing.draws}</Table.Cell>
      <Table.Cell>{standing.losses}</Table.Cell>
      <Table.Cell>{standing.goals}</Table.Cell>
      <Table.Cell>{standing.goalsAgainst}</Table.Cell>
      <Table.Cell>{standing.goalDifference}</Table.Cell>
      <Table.Cell>{standing.points}</Table.Cell>
    </Table.Row>
  );
};

StandingRow.propTypes = {
  standing: PropTypes.shape({
    teamName: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    crestURI: PropTypes.string.isRequired,
    playedGames: PropTypes.number.isRequired,
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
