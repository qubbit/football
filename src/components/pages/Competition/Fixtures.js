import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import {
  fetchCompetition,
  fetchFixtures,
  navigateToPage
} from '../../../actions';
import { Fixture } from '../../ui/Fixture';
import Loader from '../../ui/Loader';
import { getParams } from '../../../routes/route_helper';

class Fixtures extends Component {
  static teamByLogosById(teams, id) {
    const team = teams.find(t => t.id === id);
    return {
      logo: team ? team.links.logos.Small : '',
      flag: team ? team.links.logos.flag : ''
    };
  }

  async componentDidMount() {
    const { competition, fetchCompetition } = this.props;

    if (!competition) {
      const competitionShortName = getParams(this.props, 'id');
      await fetchCompetition(competitionShortName);
      return;
    }

    const { season } = competition;
    const params = {
      week: season.currentWeek && season.currentWeek.number,
      enable: 'alternateIds,broadcasts'
    };

    this.props.fetchFixtures(
      this.props.competition.urlShort || this.props.match.params.id,
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
          competition.season.currentWeek.number,
        enable: 'alternateIds,broadcasts'
      };
      this.props.fetchFixtures(competition.urlShort, params);
      return;
    }

    const params = { week: week + numDays, enable: 'alternateIds,broadcasts' };
    this.props.fetchFixtures(competition.urlShort, params);
  };

  renderDay = fixtures =>
    fixtures.map(f => <Fixture key={`match-${f.id}`} {...f} />);

  render() {
    const {
      fixtures,
      teams,
      competition,
      competitionLoading,
      fixturesLoading
    } = this.props;

    if (!competition || fixturesLoading || competitionLoading) {
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
          <div className="label">
            <h2>Week {this.props.week}</h2>
            <h2>Fixtures</h2>
          </div>
          <span className="navbar">
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
        {(!fixtures || fixtures.length === 0) && (
          <div
            style={{
              width: '100%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            }}>
            <h2>There are no matches for this week</h2>
          </div>
        )}

        <div className="fixture-list">
          {Object.keys(g).map(x => [
            <div key={x} className="match-fixture-header">
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

export function mapStateToProps(state) {
  const { teams, competition, fixtures } = state;
  return {
    fixtures: fixtures.fixtures,
    competition: competition.competition,
    teams: teams.teams,
    fixturesLoading: fixtures.loading,
    competitionLoading: competition.loading,
    matchDay: fixtures.matchDay,
    week: fixtures.week
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCompetition, fetchFixtures, navigateToPage }
  )(Fixtures)
);
