import React from "react";
import { Table, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

const styles = {
  crest: {
    borderRadius: 0,
  }
};

const StandingRow = (props) => <Table.Row>
  <Table.Cell>
    <strong>{props.position}</strong>{' '}
    <Image avatar src={props.crestURI} size='mini' style={styles.crest}/>{' '}
    <strong>{props.teamName}</strong>
  </Table.Cell>
  <Table.Cell>{props.playedGames}</Table.Cell>
  <Table.Cell>{props.wins}</Table.Cell>
  <Table.Cell>{props.draws}</Table.Cell>
  <Table.Cell>{props.losses}</Table.Cell>
  <Table.Cell>{props.goals}</Table.Cell>
  <Table.Cell>{props.goalsAgainst}</Table.Cell>
  <Table.Cell>{props.goalDifference}</Table.Cell>
  <Table.Cell>{props.points}</Table.Cell>
</Table.Row>;

StandingRow.propTypes = {
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
};

export default StandingRow;
