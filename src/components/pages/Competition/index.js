import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Link} from 'react-router-dom';
import {Loader, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {fetchTeams, fetchCompetition} from '../../../actions';
import Fixtures from './Fixtures';
import Standings from './Standings';
import Teams from './Teams';
import League from '../../ui/League';

class Competition extends Component {
  componentDidMount() {
    const {match: {params}} = this.props;
    this.props
      .fetchCompetition(params.id)
      .then(this.props.fetchTeams(params.id));
  }

  render() {
    const {competition, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }
    return (
      <div>
        <League key={`league-${competition.id}`} league={competition} />
        <Button.Group size="large" widths="3">
          <Button>
            <Link to={`/competitions/${competition.id}/fixtures`}>Fixtures</Link>
          </Button>
          <Button>
            <Link to={`/competitions/${competition.id}/standings`}>Standings</Link>
          </Button>
          <Button>
            <Link to={`/competitions/${competition.id}/teams`}>Teams</Link>
          </Button>
        </Button.Group>
        <div>
          <Route path="/competitions/:id/fixtures" exact component={Fixtures} />
          <Route path="/competitions/:id/standings" exact component={Standings} />
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
    params: PropTypes.shape({id: PropTypes.string}),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.competition.loading,
    competition: state.competition.competition,
    teams: state.teams.teams,
  };
}

export default withRouter(
  connect(mapStateToProps, {fetchTeams, fetchCompetition})(Competition),
);
