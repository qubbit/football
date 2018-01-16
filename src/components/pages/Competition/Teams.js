import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Loader} from 'semantic-ui-react';
import './Teams.scss';

class Teams extends Component {
  render() {
    const {teams, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }
    const rows = teams.map(t => {
      const code = t.code !== null ? t.code : t.name;

      return (
        <li className="card" key={`team-${code}`}>
          <div className="card-team">
            <div className="card-logo">
              <div className="team-crest-container">
                <img
                  className="team-crest"
                  alt={`Crest of ${t.name}`}
                  src={t.crestUrl}
                />
              </div>
            </div>
            <div className="card-team-body">
              <h2>{t.name}</h2>
            </div>
            <a
              className="team-roster-link animated-underline"
              href="/teams/roster">
              View Roster
            </a>
          </div>
        </li>
      );
    });

    return (
      <section style={{color: '#333'}}>
        <h1>Teams</h1>
        <ul className="competition-team-list">{rows}</ul>
      </section>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};
export default connect(
  state => ({
    teams: state.teams.teams,
    loading: state.teams.loading,
  }),
  {},
)(Teams);
