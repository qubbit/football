import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTeams, fetchCompetition } from "../../actions";
import Fixtures from "./Competition/Fixtures.js";
import Standings from "./Competition/Standings.js";
import { Link } from 'react-router-dom';
import League from '../ui/League';
import { Button } from 'semantic-ui-react';

class Competition extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchCompetition(params.id).then(this.props.fetchTeams(params.id));
  }

  render() {
    const { competition } = this.props;
    const page = this.props.match.params.page;

    let renderPage = <Fixtures competition={competition} />

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

function mapStateToProps(state) {
  return { competition: state.competitions.activeCompetition, teams: state.teams.teams };
}

export default connect(mapStateToProps, { fetchTeams, fetchCompetition })(Competition);
