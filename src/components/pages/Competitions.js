import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCompetitions } from "../../actions";
import League from '../ui/League';
import { Dropdown, Menu } from 'semantic-ui-react';

class Competitions extends Component {
  componentDidMount() {
    this.props.fetchCompetitions({ season: this.props.currentSeason.season });
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({ season: data.value });
  }

  render() {
    const { competitions, currentSeason } = this.props;
    const years = Array(10)
      .fill()
      .map((_, i) => currentSeason.year - i);

    const options = years.map(y => {
      return { key: `year-${y}`, text: y, value: y }
    });

    return <div className='ui container'>
      <h1>Competitions</h1>
      <Dropdown
        defaultValue={currentSeason.season}
        selection
        options={options}
        onChange={this.handleSeasonChange}
      />
      <div>
        { competitions.map(l => <League key={`league-${l.id}`} league={l} />) }
      </div>
    </div>;
  }
}

export default connect(
  (state) => ({
    competitions: state.competitions.competitions,
    currentSeason: state.competitions.currentSeason
  }), { fetchCompetitions }
)(Competitions);
