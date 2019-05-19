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
import { normalColor, arrayToColor } from '../../utils';
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
    const {
      match: { params }
    } = this.props;

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

  renderCompetitionLinks = groups => {
    const elems = [];
    const competitionFilterLinkStyle = {
      background: 'rgba(0, 0, 0, 0.7)',
      border: `1px solid ${palette.yellow}`,
      color: '#fff',
      marginRight: '10px',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    };

    const resetFilterLink = (
      <button
        onClick={() => this.handleHomeFixturesCompetitionFilter(undefined)}
        style={competitionFilterLinkStyle}>
        ALL
      </button>
    );

    elems.push(resetFilterLink);

    Object.keys(groups).forEach(competitionId => {
      const { competition, fixtures } = groups[competitionId];
      if (fixtures.length > 0) {
        elems.push(
          <button
            onClick={() =>
              this.handleHomeFixturesCompetitionFilter(competitionId)
            }
            style={competitionFilterLinkStyle}>
            {competition.name}
          </button>
        );
      }
    });
    return elems;
  };

  renderFixtures = fixtures => {
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

    return fixtures.map(f => (
      <Fixture
        {...f}
        key={`match-${f.id}`}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          marginBottom: '30px',
          width: '100%'
        }}
      />
    ));
  };

  render() {
    const {
      competitions,
      todaysFixtures,
      todaysFixturesFiltered,
      customFixturesDate,
      loading
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
        <div
          className="schedule-date-input"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            marginBottom: '20px',
            padding: '10px',
            fontSize: '1.3em'
          }}>
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
            <div
              className="hide-scrollbar"
              style={{ overflow: 'auto' }}>
              <p style={{ display: 'block' }}>Filter by competition:</p>
              {this.renderCompetitionLinks(groups)}
            </div>
          </div>
        </div>
        {this.renderFixtures(todaysFixturesFiltered)}
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
  connect(mapStateToProps, {
    setHomeFixtureCompetitionFilterId,
    fetchTodaysFixtures
  })(Home)
);
