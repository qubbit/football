import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchCompetitions } from '../../actions';

class CompetitionsMenu extends Component {
  componentDidMount() {
    this.props.fetchCompetitions({ season: this.props.currentSeason.season });
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({ season: data.value });
  };

  handleImageError = (e) => {
    e.target.style.display = 'none';
  }

  render() {
    const { competitions, loading, normalizers } = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const items = competitions.map(c => {
      const activeClass = this.props.competition.id === c.id ? ' active' : '';
      const normalize = normalizers.competitions[c.id];
      const competitionLogoUrl = normalize ? normalize.logo : '';
      if(!normalize) return null;
      return (
        <Link
          id={`${c.id}`}
          className={`competition-link${activeClass}`}
          key={`competition-${c.id}`}
          to={`/competitions/${c.id}`}>
          <img
            onError={this.handleImageError}
            className="competition-logo"
            alt={`${c.caption} Logo`}
            src={competitionLogoUrl}
          />
          <span>{normalize ? normalize.normalized_name : c.caption}</span>
        </Link>
      );
    });

    return (
      <div className="competition-menu-container">
        <div className='masthead'><h2>Competitions</h2></div>
        <div className="competition-menu">{items}</div>
        <footer>
          <p>
            Handmade with love by <strong>Gopal Adhikari</strong> in 2018.
          </p>
        </footer>
      </div>
    );
  }
}

CompetitionsMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSeason: PropTypes.shape({ season: PropTypes.number }).isRequired,
  fetchCompetitions: PropTypes.func.isRequired
};

export default connect(
  state => ({
    competitions: state.competitions.competitions,
    competition: state.competition.competition,
    currentSeason: state.competitions.currentSeason,
    loading: state.competitions.loading,
    normalizers: state.application.normalizers
  }),
  { fetchCompetitions }
)(CompetitionsMenu);
