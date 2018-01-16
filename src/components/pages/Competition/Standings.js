import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Table, Loader} from 'semantic-ui-react';
import {fetchStandings} from '../../../actions';
import StandingRow from '../../ui/StandingRow';

class Standings extends Component {
  componentDidMount() {
    this.props.fetchStandings(this.props.competition.id);
  }

  render() {
    const {standings, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const rows = standings.map((f) => (<StandingRow key={`standing-${f.id}`} standing={f} />));

    return (
      <div>
        <h1>Standings</h1>
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
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  competition: PropTypes.shape({ id: PropTypes.int }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchStandings: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    standings: state.standings.standings,
    competition: state.competition.competition,
    loading: state.competitions.loading,
  }),
  {fetchStandings},
)(Standings);
