import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchCompetitions } from "../../actions";

class Competitions extends Component {
  componentDidMount() {
    this.props.fetchCompetitions();
  }

  render() {
    const { competitions } = this.props;

    return <div>
      <h1>Competitions</h1>

      <div>
        { competitions.map(c => <h2><Link to={`/competitions/${c.id}`}>{c.caption}</Link></h2>) }
      </div>
    </div>;
  }
}

export default connect(
  (state) => ({
    competitions: state.competitions.competitions
  }), { fetchCompetitions }
)(Competitions);
