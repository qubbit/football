import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTeams, fetchCompetition, navigateToPage } from '../../../actions';
import Fixtures from './Fixtures';
import Standings from './Standings';
import Teams from './Teams';
import MenuBar from '../../../components/ui/MenuBar';
import Loader from '../../../components/ui/Loader';
import { determineTextColor, arrayToColor } from '../../../utils';

class Competition extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const uri = this.props.location.pathname.replace('/competitions', '');
    this.props
      .fetchCompetition(params.id)
      .then(this.props.fetchTeams(params.id))
      .then(this.props.navigateToPage(this.props.appSettings.activeMenuItem));
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const {
        match: { params }
      } = this.props;
      this.props
        .fetchCompetition(params.id)
        .then(this.props.fetchTeams(params.id))
        .then(this.props.navigateToPage(this.props.appSettings.activeMenuItem));
    }
  }

  render() {
    const {
      competition,
      teams,
      appSettings: { normalizers },
      loading
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const backgroundColor = arrayToColor(competition.color);
    const textColor = arrayToColor(determineTextColor(competition.color));
    const styles = {
      background: `linear-gradient(60deg, ${backgroundColor}, 50%, white 0%)`,
      borderBottom: `1px solid ${backgroundColor}`,
      color: textColor
    };

    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div className="main-container-header" style={styles}>
          <img
            src={competition.links.logos.sport}
            alt=""
            height="90"
            width="90"
          />
          <div className="competition-header">
            <h1>{competition.name}</h1>
            <div className="competition-meta">
              <div className="meta-item">
                <span>{competition.season.displayName} Season</span>
              </div>
              <div className="meta-item">
                <i className="icon users" /> <span>{teams.length} Teams</span>
              </div>
            </div>
          </div>
          <MenuBar />
        </div>
        <div className="page-container">
          <Route path="/competitions/:id/fixtures" exact component={Fixtures} />
          <Route
            path="/competitions/:id/standings"
            exact
            component={Standings}
          />
          <Route path="/competitions/:id/teams" exact component={Teams} />
        </div>
      </div>
    );
  }
}

Competition.propTypes = {
  loading: PropTypes.bool.isRequired,
  competition: PropTypes.shape({}).isRequired,
  fetchTeams: PropTypes.func.isRequired,
  fetchCompetition: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.competition.loading,
    competition: state.competition.competition,
    teams: state.teams.teams,
    appSettings: state.application
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchTeams, fetchCompetition, navigateToPage })(
    Competition
  )
);
