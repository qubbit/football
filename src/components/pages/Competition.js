import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchFixtures } from "../../actions";

class Competition extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchFixtures(params.id);
  }

  render() {
    const { fixtures } = this.props;

    return <div>
      <h1>Fixtures</h1>
      <div>
        { fixtures.map(f => <h3>{f.homeTeamName} - {f.awayTeamName}</h3>) }
      </div>
    </div>;
  }
}

export default connect(
  (state) => ({
    fixtures: state.competitions.fixtures
  }), { fetchFixtures }
)(Competition);
