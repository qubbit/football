import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Input, Dropdown, Icon, Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import {fetchCompetitions} from '../../actions';

class MenuBar extends Component {
  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({season: data.value});
  };

  render() {
    const {competition, activeMenuItem, currentSeason} = this.props;
    const years = Array(10)
      .fill()
      .map((_, i) => currentSeason.year - i);

    const options = years.map(y => ({
      key: `year-${y}`,
      text: `${y}/${y + 1}`,
      value: y,
    }));

    return (
      <Menu secondary>
        <Menu.Item name="fixtures" active={activeMenuItem === 'fixtures'}>
          <Link
            className="animated-underline"
            to={`/competitions/${competition.id}/fixtures`}>
            Fixtures
          </Link>
        </Menu.Item>
        <Menu.Item name="standings" active={activeMenuItem === 'standings'}>
          <Link
            className="animated-underline"
            to={`/competitions/${competition.id}/standings`}>
            Standings
          </Link>
        </Menu.Item>
        <Menu.Item name="teams" active={activeMenuItem === 'teams'}>
          <Link
            className="animated-underline"
            to={`/competitions/${competition.id}/teams`}>
            Teams
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item name="settings" active={activeMenuItem === 'settings'}>
            <Link className="animated-underline" to="/settings">
              <Icon name="setting" />
            </Link>
          </Menu.Item>
        </Menu.Menu>
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
    competition: state.competition.competition,
    activeMenuItem: state.application.activeMenuItem,
  }),
  {},
)(MenuBar);
