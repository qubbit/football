import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchTodaysFixtures } from '../../actions';
import { normalColor, arrayToColor } from '../../utils';
import Fixture from '../ui/Fixture';
import palette from '../../styles/palette.scss';

class Home extends Component {
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
    fixtures.forEach(f => console.log(f.id));
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
    const { todaysFixtures, customFixturesDate, loading } = this.props;
    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }
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
            Showing fixtures for{' '}
            {moment(customFixturesDate).format('MM-DD-YYYY')}. All times are in
            your local time.
          </div>
        </div>
        {this.renderFixtures(todaysFixtures)}
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
  return {
    loading: state.fixtures.loading,
    todaysFixtures: state.fixtures.todaysFixtures,
    customFixturesDate: state.fixtures.customFixturesDate
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchTodaysFixtures })(Home)
);
