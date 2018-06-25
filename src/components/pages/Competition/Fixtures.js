import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { fetchFixtures, navigateToPage } from '../../../actions';
import Fixture from '../../ui/Fixture';
import Loader from '../../ui/Loader';

class Fixtures extends Component {
  static teamByLogosById(teams, id) {
    const team = teams.find(t => t.id === id);
    return {
      logo: team ? team.links.logos.Small : '',
      flag: team ? team.links.logos.flag : ''
    };
  }

  componentDidMount() {
    const params = {
      week:
        this.props.competition.season.currentWeek &&
        this.props.competition.season.currentWeek.number
    };

    this.props.fetchFixtures(
      this.props.competition.fe_id || this.props.match.params.id,
      params
    );
    this.props.navigateToPage('fixtures');
  }

  goToMatchday = numDays => {
    const { competition, week } = this.props;
    if (numDays === null) {
      const params = {
        week:
          competition.season.currentWeek &&
          competition.season.currentWeek.number
      };
      this.props.fetchFixtures(competition.fe_id, params);
      return;
    }

    const params = { week: week + numDays };
    this.props.fetchFixtures(competition.fe_id, params);
  };

  renderDay = fixtures =>
    fixtures.map(f => <Fixture key={`match-${f.id}`} {...f} />);

  render() {
    const { fixtures, teams, competition, loading, matchDay } = this.props;

    if (loading) {
      return <Loader />;
    }

    let useFlag = false;
    if (competition.competitionTeamType.name === 'Country') {
      useFlag = true;
    }
    // Group fixtures by some time unit
    const fixturesWithLogos = fixtures.map(f => {
      const homeTeamLogos = Fixtures.teamByLogosById(
        teams,
        f.homeTeam && f.homeTeam.id
      );
      const awayTeamLogos = Fixtures.teamByLogosById(
        teams,
        f.awayTeam && f.awayTeam.id
      );

      return {
        ...f,
        awayTeam: {
          ...f.awayTeam,
          logo: awayTeamLogos.logo,
          flag: awayTeamLogos.flag,
          useFlag
        },
        homeTeam: {
          ...f.homeTeam,
          logo: homeTeamLogos.logo,
          flag: homeTeamLogos.flag,
          useFlag
        }
      };
    });

    const g = _.chain(fixturesWithLogos)
      .groupBy(f => moment(f.date).format('YYYYMMDD'))
      .value();

    return (
      <div style={{ width: '100%' }}>
        <div className="matchday-controls">
          <h2>Week {this.props.week}</h2>
          <h2>Fixtures</h2>
          <span>
            <button
              className="matchday-nav-button"
              title="Go to previous match day"
              onClick={() => this.goToMatchday(-1)}>
              <Icon size="large" name="chevron left" />
              <span>Previous</span>
            </button>
            <button
              className="matchday-nav-button"
              title="Go to current match day"
              onClick={() => this.goToMatchday(null)}>
              <Icon size="large" name="dot circle outline" />
            </button>
            <button
              className="matchday-nav-button"
              title="Go to next match day"
              onClick={() => this.goToMatchday(1)}>
              <span>Next</span>
              <Icon size="large" name="chevron right" />
            </button>
          </span>
        </div>
        <div className="fixture-list">
          {Object.keys(g).map(x => [
            <div key={x} className="match-fixture match-fixture-header">
              {/* Since in the groupBy we used YYYYMMDD format to parse
              the date, we need use the same format here to convert it into
              a moment date object */}
              <div>{moment(x, 'YYYYMMDD').format('dddd MMMM Do')}</div>
            </div>,
            this.renderDay(g[x])
          ])}
        </div>
      </div>
    );
  }
}

Fixtures.propTypes = {
  fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
  competition: PropTypes.shape({ id: PropTypes.number }).isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchFixtures: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    state => ({
      fixtures: state.fixtures.fixtures,
      competition: state.competition.competition,
      teams: state.teams.teams,
      loading: state.fixtures.loading,
      matchDay: state.fixtures.matchDay,
      week: state.fixtures.week
    }),
    { fetchFixtures, navigateToPage }
  )(Fixtures)
);
