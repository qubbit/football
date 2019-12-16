import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCompetition, fetchCompetitions } from '../../actions';
import { themeColor } from '../../utils';
import Loader from '../../components/ui/Loader';
import { withRouter } from 'react-router-dom';

class CompetitionsMenu extends Component {
  async componentDidMount() {
    const { fetchCompetitions, currentSeason } = this.props;
    await fetchCompetitions({ season: currentSeason.season });
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({ season: data.value });
  };

  handleImageError = e => {
    e.target.style.display = 'none';
  };

  renderSidebar = (items, style) => (
    <div className="hide-scrollbar competition-menu-container" style={style}>
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
    if (loading) {
      return this.renderSidebar([<Loader key="loader-2" />]);
    }

    const style =
      competition && competition.color
        ? { background: themeColor(competition.color) }
        : {};

    const items = competitions.map(c => {
      const activeClass =
        competition && competition.id === c.id ? ' active' : '';
      let logoUrl = '';
      if (c.links && c.links.logos) logoUrl = c.links.logos.sport;
      const link = c.uri.split('/')[1];
      return (
        <Link
          id={`${c.id}`}
          className={`competition-link${activeClass}`}
          key={`competition-${c.id}`}
          title={c.name}
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

function mapStateToProps(state) {
  return {
    competitions: state.competitions.competitions,
    competition: state.competition.competition,
    currentSeason: state.competitions.currentSeason,
    loading: state.competitions.loading,
    normalizers: state.application.normalizers
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCompetition, fetchCompetitions }
  )(CompetitionsMenu)
);
