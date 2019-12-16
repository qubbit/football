import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  setHomeFixtureCompetitionFilterId,
  fetchTodaysFixtures
} from '../../actions';
import { arrayToColor } from '../../utils';
import Fixture from '../ui/Fixture';
import palette from '../../styles/palette.scss';

class Home extends Component {
  static groupFixturesByCompetition(_fixtures, competitions) {
    const fixtureGrouping = competitions.reduce((acc, x) => {
      acc[x.id.toString()] = { competition: x, fixtures: [] };
      return acc;
    }, {});

    _fixtures.forEach(f => {
      const fixtures =
        fixtureGrouping[f.competitionId] &&
        fixtureGrouping[f.competitionId].fixtures;
      if (fixtures) fixtures.push(f);
    });

    return fixtureGrouping;
  }

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodaysFixtures(this.props.customFixturesDate, {
      enable: 'broadcasts,teamdetails',
      date: moment().format('YYYYMMDD')
    });
  }

  handleDayChange(day) {
    this.props.fetchTodaysFixtures(day, {
      enable: 'broadcasts,teamdetails',
      date: moment(day).format('YYYYMMDD')
    });
  }

  handleHomeFixturesCompetitionFilter = competitionId =>
    this.props.setHomeFixtureCompetitionFilterId(competitionId);

  renderCompetitionLinks = (groups, activeCompetitionId) => {
    const elems = [];

    const klass = 'competition-fixture-filter-link';

    const resetFilterLink = (
      <button
        onClick={() => this.handleHomeFixturesCompetitionFilter(undefined)}
        className={
          activeCompetitionId === undefined
            ? `${klass} ${klass}--active`
            : `${klass}`
        }>
        ALL
      </button>
    );

    elems.push(resetFilterLink);

    Object.keys(groups).forEach(competitionId => {
      const { competition, fixtures } = groups[competitionId];
      if (fixtures.length > 0) {
        elems.push(
          <button
            className={
              activeCompetitionId === competitionId
                ? `${klass} ${klass}--active`
                : `${klass}`
            }
            onClick={() =>
              this.handleHomeFixturesCompetitionFilter(competitionId)
            }>
            {competition.name}
          </button>
        );
      }
    });
    return elems;
  };

  renderFixtures = (fixtures, groups) => {
    if (fixtures.length === 0) {
      return (
        <h2
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px'
          }}>
          There are not any matches today
        </h2>
      );
    }

    return fixtures.map(f => {
      const g = groups[f.competitionId];
      let borderColor = palette.yellow;
      if (g) {
        borderColor = arrayToColor(g.competition.color);
      }
      return (
        <Fixture
          {...f}
          key={`match-${f.id}`}
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            marginBottom: '30px',
            width: '100%',
            borderLeft: `4px solid ${borderColor}`
          }}
        />
      );
    });
  };

  render() {
    const {
      competitions,
      customFixturesDate,
      homeFixtureCompetitionFilterId,
      loading,
      todaysFixtures,
      todaysFixturesFiltered
    } = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const groups = Home.groupFixturesByCompetition(
      todaysFixtures,
      competitions
    );

    return (
      <div className="global-fixture-list">
        <div className="schedule-date-input">
          <Icon name="calendar" style={{ color: '#fff' }} />
          <DayPickerInput
            style={{ marginBottom: '10px' }}
            value={moment(customFixturesDate).format('MM-DD-YYYY')}
            dayPickerProps={{
              showWeekNumbers: true,
              todayButton: 'Today'
            }}
            onDayChange={this.handleDayChange}
          />
          <div style={{ color: '#fff' }}>
            <p>
              Showing fixtures for{' '}
              {moment(customFixturesDate).format('MM-DD-YYYY')}. All times are
              in your local time.
            </p>
            <div className="hide-scrollbar" style={{ overflow: 'auto' }}>
              <p style={{ display: 'block' }}>Filter by competition:</p>
              {this.renderCompetitionLinks(
                groups,
                homeFixtureCompetitionFilterId
              )}
            </div>
          </div>
        </div>
        {this.renderFixtures(todaysFixturesFiltered, groups)}
      </div>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchTodaysFixtures: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

function mapStateToProps(state) {
  const { homeFixtureCompetitionFilterId } = state.fixtures;
  return {
    loading: state.fixtures.loading,
    todaysFixtures: state.fixtures.todaysFixtures,
    homeFixtureCompetitionFilterId,
    todaysFixturesFiltered: homeFixtureCompetitionFilterId
      ? state.fixtures.todaysFixtures.filter(
          item =>
            item.competitionId.toString() === homeFixtureCompetitionFilterId
        )
      : state.fixtures.todaysFixtures,
    customFixturesDate: state.fixtures.customFixturesDate,
    competitions: state.competitions.competitions
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      setHomeFixtureCompetitionFilterId,
      fetchTodaysFixtures
    }
  )(Home)
);
