import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import moment from 'moment';
import {
  setHomeFixtureCompetitionFilterId,
  fetchTodaysFixtures
} from 'src/actions/index.js';
import { arrayToColor } from 'src/utils';
import { Fixture } from '../ui/Fixture';

interface HomeProps {
  competitions: any[];
  customFixturesDate: any;
  fetchTodaysFixtures: Function;
  homeFixtureCompetitionFilterId: any;
  loading: boolean;
  setHomeFixtureCompetitionFilterId: Function;
  todaysFixtures: any;
  todaysFixturesFiltered: any;
}

class Home extends Component<HomeProps> {
  static groupFixturesByCompetition(_fixtures: any[], competitions: any[]) {
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

  constructor(props: HomeProps) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodaysFixtures(this.props.customFixturesDate, {
      enable: 'broadcasts,teamdetails',
      date: moment().format('YYYYMMDD')
    });
  }

  handleDayChange(day: any) {
    this.props.fetchTodaysFixtures(day, {
      enable: 'broadcasts,teamdetails',
      date: moment(day).format('YYYYMMDD')
    });
  }

  handleHomeFixturesCompetitionFilter = (competitionId: any) =>
    this.props.setHomeFixtureCompetitionFilterId(competitionId);

  renderCompetitionLinks = (groups: any, activeCompetitionId: string) => {
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

  renderFixtures = (fixtures: any[], groups: any) => {
    if (fixtures.length === 0) {
      return (
        <h2
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px'
          }}>
          There are no matches scheduled for this day
        </h2>
      );
    }

    const elements = fixtures.map(f => {
      const g = groups[f.competitionId];
      if (g) {
        const borderColor = arrayToColor(g.competition.color);
      }
      console.log(f);
      debugger;
      return <Fixture {...f} key={`match-${f.id}`} />;
    });

    return <div>{elements}</div>;
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
          <div style={{ marginBottom: '10px' }}>
            <DayPickerInput
              value={moment(customFixturesDate).format('MM-DD-YYYY')}
              dayPickerProps={{
                showWeekNumbers: true,
                todayButton: 'Today'
              }}
              onDayChange={this.handleDayChange}
            />
          </div>
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

function mapStateToProps(state: any) {
  const { homeFixtureCompetitionFilterId } = state.fixtures;
  return {
    loading: state.fixtures.loading,
    todaysFixtures: state.fixtures.todaysFixtures,
    homeFixtureCompetitionFilterId,
    todaysFixturesFiltered: homeFixtureCompetitionFilterId
      ? state.fixtures.todaysFixtures.filter(
          (item: any) =>
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
