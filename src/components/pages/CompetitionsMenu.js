import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {fetchCompetitions} from '../../actions';

class CompetitionsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: props.competition.id || 445 }
  }

  componentDidMount() {
    this.props.fetchCompetitions({season: this.props.currentSeason.season});
  }

  handleSeasonChange = (_, data) => {
    this.props.fetchCompetitions({season: data.value});
  };

  handleClick = (e, v) => {
    this.setState({ activeItem: parseInt(e.target.id, 10) });
  }

  render() {
    const {competitions, loading} = this.props;
    const { activeItem } = this.state;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }

    const items = competitions.map(c => {
      const activeClass = activeItem === c.id ? ' active' : '';
      return <Link
        id={`${c.id}`}
        className={`competition-link${activeClass}`}
        key={`competition-${c.id}`}
        onClick={this.handleClick}
        to={`/competitions/${c.id}`}>
        {c.caption}
      </Link>;
    })

    return (
      <div className="competition-menu-container">
        <h2>Competitions</h2>
        <div className="competition-menu">
          {items}
        </div>
        <footer>
          <p>
            Hand made with love by Gopal Adhikari in 2018.
          </p>
        </footer>
      </div>
    );
  }
}

CompetitionsMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSeason: PropTypes.shape({season: PropTypes.number}).isRequired,
  fetchCompetitions: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    competitions: state.competitions.competitions,
    competition: state.competition.competition,
    currentSeason: state.competitions.currentSeason,
    loading: state.competitions.loading,
  }),
  {fetchCompetitions},
)(CompetitionsMenu);
