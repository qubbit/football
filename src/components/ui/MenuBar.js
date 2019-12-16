import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class MenuBar extends Component {
  render() {
    const { competition, activeMenuItem } = this.props;
    const { urlShort } = competition;

    return (
      <Menu secondary className="competition-menu-bar">
        <Menu.Item
          className="animated-underline"
          name="fixtures"
          active={activeMenuItem === 'fixtures'}>
          <Link to={`/competitions/${urlShort}/fixtures`}>Fixtures</Link>
        </Menu.Item>
        <Menu.Item
          className="animated-underline"
          name="standings"
          active={activeMenuItem === 'standings'}>
          <Link to={`/competitions/${urlShort}/standings`}>Standings</Link>
        </Menu.Item>
        <Menu.Item
          className="animated-underline"
          name="teams"
          active={activeMenuItem === 'teams'}>
          <Link to={`/competitions/${urlShort}/teams`}>Teams</Link>
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
  currentSeason: PropTypes.shape({ season: PropTypes.number }).isRequired
};
