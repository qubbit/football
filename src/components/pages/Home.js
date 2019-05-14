import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchTodaysFixtures } from '../../actions';
import { normalColor, arrayToColor } from '../../utils';
import Fixture from '../ui/Fixture';

class Home extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.props.fetchTodaysFixtures({
      enable: 'broadcasts,teamdetails',
      date: moment().format('YYYYMMDD')
    });
  }

  renderFixtures = fixtures =>
    fixtures.map(f => (
      <Fixture
        {...f}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          marginBottom: '30px',
          width: '100%'
        }}
      />
    ));

  render() {
    const { todaysFixtures, loading } = this.props;
    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    if (todaysFixtures.length > 0) {
      return <div>{this.renderFixtures(todaysFixtures)}</div>;
    }
    return <h2 style={{ color: '#fff' }}>There are not any matches today</h2>;
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
    todaysFixtures: state.fixtures.todaysFixtures
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchTodaysFixtures })(Home)
);
