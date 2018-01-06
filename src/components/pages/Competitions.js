import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCompetitions } from "../../actions";
import League from '../ui/League';

class Competitions extends Component {
  componentDidMount() {
    this.props.fetchCompetitions();
  }

  render() {
    const { competitions } = this.props;

    return <div className='ui container'>
      <h1>Competitions</h1>

      <div>
        { competitions.map(l => <League key={`league-${l.id}`} league={l} />) }
      </div>
    </div>;
  }
}

export default connect(
  (state) => ({
    competitions: state.competitions.competitions
  }), { fetchCompetitions }
)(Competitions);
