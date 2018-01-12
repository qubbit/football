import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTeams, fetchCompetition } from "../../actions";
import Fixtures from "./Competition/Fixtures.js";
import Standings from "./Competition/Standings.js";
import { Link } from 'react-router-dom';
import League from '../ui/League';
import { Loader, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Competition extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    // Promise.all([this.props.fetchCompetition(params.id), this.props.fetchTeams(params.id)]);
    this.props.fetchCompetition(params.id).then(this.props.fetchTeams(params.id));
  }

  render() {
    const { competition, loading } = this.props;
    const page = this.props.match.params.page;

    if(loading) {
      // return <Loader size='large'>Loading...</Loader>
    }

    let renderPage = null; // <Fixtures competition={competition} />

    switch(page) {
      case 'fixtures':
        renderPage = <Fixtures competition={competition} />
        break;
      case 'standings':
        renderPage = <Standings competition={competition} />
        break;
      case 'teams':
        renderPage = <Fixtures competition={competition} />
        break;
      default:
        renderPage = <Fixtures competition={competition} />
        break;
    }

    return <div>
      <League key={`league-${competition.id}`} league={competition} />
      <Button.Group size='large' widths='3'>
        <Button><Link to={`/competitions/${competition.id}/fixtures`}>Fixtures</Link></Button>
        <Button><Link to={`/competitions/${competition.id}/standings`}>Standings</Link></Button>
        <Button><Link to={`/competitions/${competition.id}/teams`}>Teams</Link></Button>
      </Button.Group>
      {renderPage}
    </div>;
  }
}

Competition.propTypes = {
  loading          : PropTypes.bool.isRequired,
  competition      : PropTypes.object.isRequired,
  teams            : PropTypes.array.isRequired,
  fetchTeams       : PropTypes.func.isRequired,
  fetchCompetition : PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.competitions.loading,
    competition: state.competitions.currentCompetition,
    teams: state.teams.teams
  };
}

export default connect(mapStateToProps, { fetchTeams, fetchCompetition })(Competition);
