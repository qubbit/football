import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Image} from 'semantic-ui-react';
import './Teams.css'

class Teams extends Component {
  teamByName(teams, name) {
    return teams.find(t => t.name === name);
  }

  render() {
    const {competition, teams} = this.props;
    const rows = teams.map((t, i) => {
      return (
        <li
          className="card"
          style={{
            textAlign: 'center',
            width: '25%',
            padding: '12px 8px',
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto',
          }}
          key={`team-${i}`}>
          <div
            className="card-team"
            style={{
              backgroundColor: 'rgba(51, 51, 51, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}>
            <div className="card-logo">
              <div
                style={{
                  marginLeft: '20px',
                  marginRight: '20px',
                  marginTop: '20px',
                  paddingTop: '30px',
                  width: 'calc(100% - 40px)',
                }}
                className="team-crest-container">
                <img style={{height: '150px'}} src={t.crestUrl} />
              </div>
            </div>
            <div className="card-team-body" style={{flexGrow: 1, padding: '20px'}}>
              <h2>{t.name}</h2>
            </div>
            <a
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderTop: '1px solid rgba(51,51,51,.2)',
                padding: '1.075em 1.5em .925em',
                textTransform: 'uppercase'
              }}
              className='animated-underline'
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
        <ul
          style={{
            padding: 0,
            listStyleType: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          {rows}
        </ul>
      </section>
    );
  }
}

Teams.propTypes = {
  competition: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default connect(
  state => ({
    competition: state.competition.competition,
    teams: state.teams.teams,
    loading: state.competitions.loading,
  }),
  {},
)(Teams);
