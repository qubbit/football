import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown, Icon, Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import {fetchCompetitions} from '../../actions';

class MenuBar extends Component {
  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({season: data.value});
  };

  render() {
    const {currentSeason} = this.props;
    const years = Array(10)
      .fill()
      .map((_, i) => currentSeason.year - i);

    const options = years.map(y => ({
      key: `year-${y}`,
      text: `${y}/${y + 1}`,
      value: y,
    }));

    return (
      <Menu compact>
        <Dropdown
          defaultValue={currentSeason.season}
          selection
          options={options}
          onChange={this.handleSeasonChange}
        />
        <Icon name='settings'/>
      </Menu>
    );
  }
}

MenuBar.propTypes = {
  currentSeason: PropTypes.shape({season: PropTypes.number}).isRequired,
};

export default connect(
  state => ({
    currentSeason: state.competitions.currentSeason,
  }),
  {},
)(MenuBar);
