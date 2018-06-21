import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCompetitions } from '../../actions';
import { themeColor } from '../../utils';
import Loader from '../../components/ui/Loader';

class CompetitionsMenu extends Component {
  componentDidMount() {
    this.props.fetchCompetitions({ season: this.props.currentSeason.season });
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({ season: data.value });
  };

  handleImageError = e => {
    e.target.style.display = 'none';
  };

  renderSidebar = (items, style) => (
    <div className="competition-menu-container" style={style}>
      <div className="masthead">
        <a href="/">
          <h2 className="masthead-title">Competitions</h2>
        </a>
      </div>
      <div className="competition-menu">{items}</div>
    </div>
  );

  render() {
    const { competition, competitions, loading } = this.props;
    const style = competition.color
      ? { background: themeColor(competition.color) }
      : {};

    if (loading) {
      return this.renderSidebar([<Loader key="loader-2" />]);
    }

    const items = competitions.map(c => {
      const activeClass = competition.id === c.id ? ' active' : '';
      let logoUrl = '';
      if (c.links && c.links.logos) logoUrl = c.links.logos.sport;
      const link = c.uri.split('/')[1];
      return (
        <Link
          id={`${c.id}`}
          className={`competition-link${activeClass}`}
          key={`competition-${c.id}`}
          to={`/competitions/${link}`}>
          <img
            onError={this.handleImageError}
            className="competition-logo"
            alt={`${c.name} Logo`}
            src={logoUrl}
          />
          <span className="competition-name">{c.name}</span>
        </Link>
      );
    });

    return this.renderSidebar(items, style);
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
