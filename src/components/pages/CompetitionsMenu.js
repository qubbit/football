import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {fetchCompetitions} from '../../actions';

class Competitions extends Component {
  componentDidMount() {
    this.props.fetchCompetitions({season: this.props.currentSeason.season});
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({season: data.value});
  };

  render() {
    const {competitions, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    return (
      <div className="competition-menu-container">
        <h2>Competitions</h2>
        <div className="competition-menu">
          {competitions.map(c => (
            <Link
              className="competition-link"
              key={`competition-${c.id}`}
              to={`/competitions/${c.id}`}>
              {c.caption}
            </Link>
          ))}
        </div>
        <footer>
          <p>
            Hand made with love by Gopal Adhikari in 2018.
          </p>
        </footer>
      </div>
    );
  }
}

Competitions.propTypes = {
  loading: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSeason: PropTypes.shape({season: PropTypes.number}).isRequired,
  fetchCompetitions: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    competitions: state.competitions.competitions,
    currentSeason: state.competitions.currentSeason,
    loading: state.competitions.loading,
  }),
  {fetchCompetitions},
)(Competitions);
