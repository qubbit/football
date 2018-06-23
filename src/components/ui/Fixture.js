import React from 'react';
import moment from 'moment';
import { Grid, Segment, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Fixture = props => {
  let fixtureStatus = (
    <div className="fixture-status">
      <div className="fixture-status-score">
        {props.score ? props.score.homeScore : '-'}
      </div>
      <div className="fixture-status-score">
        {[2, 3].includes(props.status.id) ? (
          <div className="fixture-status-score-live">LIVE</div>
        ) : (
          '-'
        )}
      </div>
      <div className="fixture-status-score">
        {props.score ? props.score.awayScore : '-'}
      </div>
    </div>
  );

  if (['Pregame'].includes(props.status.name)) {
    fixtureStatus = (
      <div className="fixture-status">
        <div className="fixture-status-score">
          {moment(props.date).format('hh:mm A')}
        </div>
      </div>
    );
  }
  return [
    <div className="match-venu">{`${props.venue.name}, ${
      props.venue.city
    }`}</div>,
    <div className="match-fixture">
      <div className="fixture-team">
        <div className="team-label team-label--reverse">
          <Image
            className="team-label-image"
            height="64"
            src={props.homeTeam.useFlag ? props.homeTeam.flag :  props.homeTeam.logo}
          />
          <div className="team-label-name">
            {props.homeTeam && props.homeTeam.name}
          </div>
        </div>
      </div>
      {fixtureStatus}
      <div className="fixture-team">
        <div className="team-label">
          <Image
            className="team-label-image"
            height="64"
            src={props.awayTeam.useFlag ? props.awayTeam.flag :  props.awayTeam.logo}
          />
          <div className="team-label-name">
            {props.awayTeam && props.awayTeam.name}
          </div>
        </div>
      </div>
    </div>
  ];
};

/*
Fixture.defaultProps = {
  homeTeam: {},
  awayTeam: {},
  score: { homeScore: '-', awayScore: '-'}
};

Fixture.propTypes = {
  homeTeam: PropTypes.shape({ name: PropTypes.string, crestUrl: PropTypes.string }),
  awayTeam: PropTypes.shape({ name: PropTypes.string, crestUrl: PropTypes.string }),
  score: PropTypes.shape({
    homeScore: PropTypes.number,
    awayScore: PropTypes.number
  }),
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
*/

export default Fixture;
