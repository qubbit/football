import React from 'react';
import {Table, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const styles = {
  crest: {
    borderRadius: 0,
  },
};

const UEFAStandingRow = props => {
  const {standing} = props;
  return (
    <Table.Row>
      <Table.Cell>
        <Image
          avatar
          src={standing.crestURI}
          size="mini"
          style={styles.crest}
        />{' '}
        <span style={{marginLeft: '10px'}}>{standing.team}</span>
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

UEFAStandingRow.propTypes = {
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
    points: PropTypes.number.isRequired,
  }).isRequired,
};

export default UEFAStandingRow;
