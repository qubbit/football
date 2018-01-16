import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader, Dropdown, Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import League from '../ui/League';
import {fetchCompetitions} from '../../actions';

class Competitions extends Component {
  componentDidMount() {
    this.props.fetchCompetitions({season: this.props.currentSeason.season});
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({season: data.value});
  };

  render() {
    const {competitions, currentSeason, loading} = this.props;
    const years = Array(10)
      .fill()
      .map((_, i) => currentSeason.year - i);

    const options = years.map(y => ({key: `year-${y}`, text: `${y}/${y + 1}`, value: y}));

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    return (
      <div className="ui container">
        <h1>Competitions</h1>
        <Menu compact>
          <Dropdown
            defaultValue={currentSeason.season}
            selection
            options={options}
            onChange={this.handleSeasonChange}
          />
        </Menu>
        <div>
          {competitions.map(l => <League key={`league-${l.id}`} league={l} />)}
        </div>
      </div>
    );
  }
}

Competitions.propTypes = {
  loading: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSeason: PropTypes.shape({ season: PropTypes.string }).isRequired,
  fetchCompetitions: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    competitions: state.competitions.competitions,
    currentSeason: state.competitions.currentSeason,
    loading: state.competitions.loading,
  }),
  {fetchCompetitions},
)(Competitions);
