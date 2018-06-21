import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { fetchStandings, navigateToPage } from '../../../actions';
import StandingRow from '../../ui/StandingRow';
import GroupStandingRow from '../../ui/GroupStandingRow';
import Loader from '../../ui/Loader';

class Standings extends Component {
  componentDidMount() {
    this.props
      .fetchStandings(this.props.competition.fe_id)
      .then(this.props.navigateToPage('standings'));
  }

  enmeshGroups = standings => {
    const c = standings.competitors;
    const g = standings.groups;
    const dict = g.reduce((acc, v) => {
      acc[v.id] = { name: v.name, teams: [] };
      return acc;
    }, {});
    c.forEach(x => dict[x.groupId].teams.push(x));
    return dict;
  };

  renderTableHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
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
  );

  render() {
    const { competition, standings, loading } = this.props;

    if (loading) return <Loader />;

    let renderElement;

    if (standings.groups.length > 1) {
      const groups = this.enmeshGroups(standings);
      const table = Object.keys(groups).map(id => (
        <div className="group-table-container">
          <h3>{groups[id].name}</h3>
          <Table size="large" selectable basic="very">
            {this.renderTableHeader()}
            {groups[id].teams.map(t => (
              <GroupStandingRow key={`team-${t.id}`} standing={t} />
            ))}
            <Table.Body />
          </Table>
        </div>
      ));
      renderElement = table;
    } else {
      const rows = standings.competitors.map((t, i) => (
        <StandingRow
          key={`standing-${t.id}`}
          standing={{ ...t, position: i + 1 }}
        />
      ));

      renderElement = (
        <Table size="large" selectable basic="very">
          {this.renderTableHeader()}
          <Table.Body>{rows}</Table.Body>
        </Table>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <h2 className="page-title">Standings</h2>
        {renderElement}
      </div>
    );
  }
}

Standings.propTypes = {
  standings: PropTypes.any.isRequired,
  competition: PropTypes.shape({ id: PropTypes.number }).isRequired,
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
