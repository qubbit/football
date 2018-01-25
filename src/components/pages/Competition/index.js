import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { fetchTeams, fetchCompetition, navigateToPage } from '../../../actions';
import Fixtures from './Fixtures';
import Standings from './Standings';
import Teams from './Teams';
import MenuBar from '../../../components/ui/MenuBar';
import { determineTextColor, arrayToColor } from '../../../utils';

class Competition extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props
      .fetchCompetition(params.id)
      .then(this.props.fetchTeams(params.id))
      .then(this.props.navigateToPage(this.props.appSettings.activeMenuItem));
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { match: { params } } = this.props;
      this.props
        .fetchCompetition(params.id)
        .then(this.props.fetchTeams(params.id));
    }
  }

  render() {
    const { competition, appSettings: { normalizers }, loading } = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const useExperimentalStyle = true;
    let experimentalStyle = {};

    const normalize = normalizers.competitions[competition.id];
    if (useExperimentalStyle) {
      const backgroundColor = arrayToColor(normalize.primary_color);
      const textColor = arrayToColor(
        determineTextColor(normalize.primary_color)
      );
      experimentalStyle = {
        background: `linear-gradient(60deg, ${backgroundColor}, 50%, white 0%)`,
        borderBottom: `1px solid ${backgroundColor}`,
        color: textColor
      };
    }

    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div className="main-container-header" style={experimentalStyle}>
          <img src={normalize.logo} alt="" height="90" width="90" />
          <div className="competition-header">
            <h1>{competition.caption}</h1>
            <div className="competition-meta">
              <div className="meta-item">
                <i className="icon users" />{' '}
                <span>{competition.numberOfTeams} Teams</span>
              </div>
              <div className="meta-item">
                <i className="icon soccer" />{' '}
                <span>{competition.numberOfGames} Games</span>
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
