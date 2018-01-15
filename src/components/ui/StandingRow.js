import React, { Component } from "react";
import moment from "moment";
import { Table, Grid, Segment, Image, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

const styles = {
  crest: {
    borderRadius: 0,
  }
};

class StandingRow extends Component {
  render() {
    const r = this.props.standing;
    return (
      <Table.Row>
        <Table.Cell>
          <strong>{r.position}</strong>{' '}
          <Image avatar src={r.crestURI} size='mini' style={styles.crest}/>{' '}
          <strong>{r.teamName}</strong>
        </Table.Cell>
        <Table.Cell>{r.playedGames}</Table.Cell>
        <Table.Cell>{r.wins}</Table.Cell>
        <Table.Cell>{r.draws}</Table.Cell>
        <Table.Cell>{r.losses}</Table.Cell>
        <Table.Cell>{r.goals}</Table.Cell>
        <Table.Cell>{r.goalsAgainst}</Table.Cell>
        <Table.Cell>{r.goalDifference}</Table.Cell>
        <Table.Cell>{r.points}</Table.Cell>
      </Table.Row>
    );
  }
}

StandingRow.defaultProps = {
  homeTeam: {},
  awayTeam: {}
};

StandingRow.propTypes = {
  homeTeam: PropTypes.object.isRequired,
  awayTeam: PropTypes.object.isRequired
};

export default StandingRow;
